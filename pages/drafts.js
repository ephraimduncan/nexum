import { gql } from "graphql-request";
import Layout from "../components/Layout";
import Post from "../components/Post";
import WithAuth from "../lib/WithAuth";
import client from "../graphql/client";
import { useSession } from "next-auth/react";

export default function Drafts(props) {
  const { data: session, status } = useSession();

  return (
    <WithAuth>
      <Layout>
        <h1>My Drafts</h1>
        <div>
          {props.drafts
            .filter((post) => post?.author?.id === session?.userId)
            .map((post) => (
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

  const data = await client.request(query);

  return {
    props: data,
  };
}
