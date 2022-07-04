import { useSession } from "next-auth/react";
import Layout from "../components/Layout";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <Layout>
      {session ? (
        <div>
          Logged In User
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : (
        <div>Not Logged In</div>
      )}
    </Layout>
  );
}
