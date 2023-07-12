import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "./ui/button";
import profileIcon from "@/public/assets/profile.svg";
import { cn } from "@/lib/utils";

export default function SignInButton({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        <div className={cn("flex flex-row space-x-4 m-auto", className)}>
          <p className="mt-3 text-center text-sm font-medium align-middle">
            {session?.user?.username}
          </p>
          <Button
            onClick={() => signOut()}
            className="text-sm text-white bg-gray-600 rounded-xl shadow hover:bg-gray-800"
          >
            Sign Out
          </Button>
        </div>
      </>
    );
  }
  return (
    <>
      <Button
        onClick={() => signIn()}
        className="text-sm text-white bg-gray-600 rounded-xl shadow hover:bg-gray-800"
      >
        Sign In
      </Button>
    </>
  );
}
