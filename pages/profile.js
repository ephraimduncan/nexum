import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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
      <div>
        You need to be signed In. <h1>Redirecting to Sign In Page</h1>
      </div>
    );
  }

  if (status === "loading") {
    return <div>Page Loading...</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
