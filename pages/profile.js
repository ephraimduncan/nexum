import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/api/auth/signin");
    },
  });

  if (status === "unauthenticated") {
    return (
      <Layout>
        <div>
          You need to be signed In. <h1>Redirecting to Sign In Page</h1>
        </div>
      </Layout>
    );
  }

  if (status === "loading") {
    return (
      <Layout>
        <div>Page Loading...</div>;
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <h2>Profile Page</h2>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </Layout>
  );
}
