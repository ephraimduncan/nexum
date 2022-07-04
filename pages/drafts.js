import React from "react";
import { request, gql } from "graphql-request";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { useSession } from "next-auth/react";

export default function Drafts(props) {
  const { _ } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin");
    },
  });

  return (
    <Layout>
      <h1>My Drafts</h1>
      <div>
        {props.drafts.map((post) => (
          <div key={post.id} className="post">
            <Post post={post} />
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  const query = gql`
    {
      drafts {
        content
        published
        id
        title
        author {
          name
          email
          id
        }
      }
    }
  `;

  const data = await request("http://localhost:3000/api/graphql", query);

  return {
    props: data,
  };
}
