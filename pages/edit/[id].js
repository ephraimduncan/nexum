import React from "react";
import { useRouter } from "next/router";
import WithAuth from "../../lib/WithAuth";
import Layout from "../../components/Layout";
import client from "../../graphql/client";
import { gql } from "graphql-request";

export default function EditPost({ post }) {
  const [title, setTitle] = React.useState(post.title);
  const [content, setContent] = React.useState(post.content);
  const [publish, setPublish] = React.useState(post.published);

  const router = useRouter();
  const { id } = router.query;

  const updatePost = async (e) => {
    e.preventDefault();

    try {
      const query = gql`
        mutation updatePost($id: ID!, $title: String!, $content: String, $publish: Boolean) {
          updatePost(id: $id, input: { title: $title, content: $content, publish: $publish }) {
            id
          }
        }
      `;

      const variables = {
        id,
        title,
        content,
        publish,
      };

      const data = await client.request(query, variables);

      await router.push(`/post/${data.updatePost.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WithAuth>
      <Layout>
        <div className="post-page">
          <form onSubmit={updatePost}>
            <h1>Update Post</h1>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={title}
            />
            <textarea
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={8}
              value={content}
            />
            <input onClick={() => setPublish(true)} type="submit" value="Update Post" />
            <input onClick={() => setPublish(false)} type="submit" value="Draft" />

            <a className="back" href="#" onClick={() => router.push("/")}>
              or Cancel
            </a>
          </form>
        </div>
      </Layout>
    </WithAuth>
  );
}

export async function getServerSideProps({ params }) {
  const query = gql`
    query getPost($id: ID!) {
      post(id: $id) {
        author {
          image
          name
          id
        }
        content
        id
        published
        title
      }
    }
  `;

  const variables = {
    id: params.id,
  };

  const data = await client.request(query, variables);

  return {
    props: data,
  };
}
