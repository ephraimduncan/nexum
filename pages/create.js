import React from "react";
import { useRouter } from "next/router";
import WithAuth from "../lib/WithAuth";
import Layout from "../components/Layout";
import client from "../graphql/client";
import { gql } from "graphql-request";

export default function CreatePost() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [publish, setPublish] = React.useState(false);
  const Router = useRouter();

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const query = gql`
        mutation createPost($title: String!, $content: String, $publish: Boolean) {
          createPost(input: { title: $title, content: $content, publish: $publish }) {
            id
          }
        }
      `;

      const variables = {
        title,
        content,
        publish,
      };

      const data = await client.request(query, variables);

      await Router.push(`/post/${data.createPost.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WithAuth>
      <Layout>
        <div className="post-page">
          <form onSubmit={submitData}>
            <h1>New Post</h1>
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
            <input
              disabled={!content || !title}
              onClick={() => setPublish(true)}
              type="submit"
              value="Create Post"
            />
            <input
              disabled={!content || !title}
              onClick={() => setPublish(false)}
              type="submit"
              value="Create Draft"
            />

            <a className="back" href="#" onClick={() => Router.push("/")}>
              or Cancel
            </a>
          </form>
        </div>
      </Layout>
    </WithAuth>
  );
}
