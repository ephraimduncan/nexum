import { gql } from "graphql-request";
import Layout from "../components/Layout";
import Post from "../components/Post";
import WithAuth from "../lib/WithAuth";
import client from "../graphql/client";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default function Drafts(props) {
  return (
    <WithAuth>
      <Layout>
        <h1>My Drafts</h1>
        <div>
          {props.userDrafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </div>
      </Layout>
    </WithAuth>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  const query = gql`
    query getUserDrafts($id: ID!) {
      userDrafts(id: $id) {
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

  const data = await client.request(query, { id: session.userId });

  return {
    props: data,
  };
}
