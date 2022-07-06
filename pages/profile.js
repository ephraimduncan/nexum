import { gql } from "graphql-request";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Layout from "../components/Layout";
import Post from "../components/Post";
import client from "../graphql/client";
import WithAuth from "../lib/WithAuth";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default function ProfilePage(props) {
  const { data: session, status } = useSession();

  return (
    <WithAuth>
      <Layout>
        <div>
          <h1>Profile Page</h1>
          {!session ? (
            <div>Loading Skeleton</div>
          ) : (
            <div className="profile-card">
              <Image alt="Profile Picture" src={session.user.image} width="80" height="80" />
              <div>
                <h2>{session.user.name}</h2>
                <p>{session.user.email}</p>
              </div>
            </div>
          )}
        </div>

        <h1>My Posts</h1>
        {props.userPosts.map((post) => {
          return (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          );
        })}
      </Layout>
    </WithAuth>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);

  const query = gql`
    query getUserPosts($id: ID!) {
      userPosts(id: $id) {
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
