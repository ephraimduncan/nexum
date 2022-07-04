import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function WithAuth({ children }) {
  const router = useRouter();

  const { data, status } = useSession({
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
        <div>Page Loading...</div>
      </Layout>
    );
  }

  return children;
}
