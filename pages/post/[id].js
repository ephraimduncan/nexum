import request, { gql } from "graphql-request";
import Image from "next/image";
import React from "react";
import Layout from "../../components/Layout";

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
        <p className="content">{post.content}</p>
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

  const data = await request("http://localhost:3000/api/graphql", query, variables);

  return {
    props: data,
  };
}
