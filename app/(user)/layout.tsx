import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getUser();

  if (!session) return redirect("/");

  return session.user.status === "Accepted" ? (
    <div>{children}</div>
  ) : (
    redirect("/verifyuser")
  );
}
