"use client";

import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import SignInButton from "./SignInButton";

export default function Navbar() {
  return (
    <NavigationMenu className="container w-full rounded-2xl px-5 py-3 mx-auto justify-between">
      <NavigationMenuList className="flex mx-auto space-x-6">
        <div className="flex items-start justify-stretch">
          <NavigationMenuItem className="px-5">
            <Image
              src="assets/logo-light.svg"
              width={80}
              height={20}
              alt="Placement Cell Logo"
            />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/jobs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Jobs
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/internships" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Internships
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
      <NavigationMenuList className="flex end-5">
        <NavigationMenuItem className="end-0">
          <SignInButton />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
