import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ProfileNav } from "./dashboard/profileNav";

export default function SignInButton({
  className,
}: React.HTMLAttributes<HTMLElement>) {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        <div className={cn("m-auto flex flex-row space-x-4", className)}>
          <p className="mt-2 text-center text-sm font-bold text-white">
            {session.user.username} - {session.user.role}
          </p>
          <ProfileNav session={session} />
        </div>
      </>
    );
  }
  return (
    <>
      <Button
        onClick={() => signIn()}
        className="rounded-xl bg-gray-600 text-sm text-white shadow hover:bg-gray-500"
      >
        Login
      </Button>
    </>
  );
}
