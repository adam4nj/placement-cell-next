import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export function ProfileCard() {
  const { data: session } = useSession();
  return (
    <Card className="w-fit flex flex-row p-7 rounded-xl">
      {!session?.user && !session?.user.name ? (
        <Avatar className="w-20 h-20">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="w-20 h-20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{session?.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col p-3">
        <h2 className="text-lg font-semibold">{session?.user.name}</h2>
        <p>{session?.user.username}</p>
      </div>
    </Card>
  );
}
