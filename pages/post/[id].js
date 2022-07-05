import React from "react";
import Image from "next/image";
import { gql } from "graphql-request";
import Layout from "../../components/Layout";
import client from "../../graphql/client";

export default function PostPage({ post }) {
  return (
    <Layout>
      <div className="preview-post">
        <h1>{post.title}</h1>
        <div className="author">
          <Image src={post.author.image} width={24} height={24} />
          <h3>{post.author.name}</h3>
        </div>

        {post.published ? <p className="publish">Published</p> : <p className="publish">Draft</p>}
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
