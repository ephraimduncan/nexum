import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import WithAuth from "../lib/WithAuth";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  return (
    <WithAuth>
      <Layout>
        <div>
          <h2>Profile Page</h2>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      </Layout>
    </WithAuth>
  );
}
