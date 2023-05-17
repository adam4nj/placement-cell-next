"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SignInButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button
                onClick={() => signOut()}
                className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                >
                Sign Out
              </button>
        
      </>
    );
  }
  return (
    <>
      <button
                onClick={() => signIn("google")}
                className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                >
                Sign in
              </button>
    </>
  );
}