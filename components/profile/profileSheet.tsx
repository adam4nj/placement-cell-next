import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function ProfileSheet() {
  const { data: session } = useSession();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="mx-auto items-start justify-start">
          <MenuIcon className="w-4 h-4" />
        </button>
      </SheetTrigger>
      <SheetContent position="left" size="sm">
        <SheetHeader>
          <SheetTitle>{session?.user.username}</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">Profile</div>
          <div
            className="grid grid-cols-4 items-center gap-4"
            onClick={() => signOut()}
          >
            Logout
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>x </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
