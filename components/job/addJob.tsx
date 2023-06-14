import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function AddJob() {
  return (
    //Tooltip - try to implement
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-10 rounded-full p-0">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Add New</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/company/dashboard/jobs/add-job">
          <DropdownMenuItem>Job</DropdownMenuItem>
        </Link>
        <Link href="/company/dashboard/internships/add-internship">
          <DropdownMenuItem>Internship</DropdownMenuItem>
        </Link>
        <Link href="/company/dashboard/notifications/add-notification">
          <DropdownMenuItem>Notification</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
