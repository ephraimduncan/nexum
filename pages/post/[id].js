import React from "react";
import Image from "next/image";
import { gql } from "graphql-request";
import Layout from "../../components/Layout";
import client from "../../graphql/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function PostPage({ post }) {
  const { data: session, state } = useSession();
  const router = useRouter();

  const isAuthorNameSame = session?.user?.name === post?.author?.name;
  const isAuthorIdSame = session?.userId === post?.author?.id;
  const isPostAuthorLoggedIn = isAuthorIdSame && isAuthorNameSame;

  const deletePost = async () => {
    try {
      const query = gql`
        mutation deletePost($id: ID!) {
          deletePost(id: $id) {
            id
          }
        }
      `;

      await client.request(query, { id: router.query.id });
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="preview-post">
        <h1>{post.title}</h1>
        <div className="author">
          <Image src={post.author.image} width={24} height={24} />
          <h3>{post.author.name}</h3>
        </div>

        <div className="post-button">
          <div>
            {post.published ? (
              <p className="publish">Published</p>
            ) : (
              <p className="publish">Draft</p>
            )}
          </div>

          {isPostAuthorLoggedIn && (
            <div>
              <button
                onClick={() => {
                  router.push(`/edit/${post.id}`);
                }}
              >
                Edit Post
              </button>
              <button onClick={deletePost}>Delete Post</button>
            </div>
          )}
        </div>

        <pre className="content">{post.content}</pre>
      </div>
    </Layout>
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
