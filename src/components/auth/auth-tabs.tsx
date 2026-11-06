"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // or from "cn"

export function AuthTabs() {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";
  const isSignUp = pathname === "/sign-up";

  const tabClass = (active: boolean) =>
    cn(
      "pb-3 w-1/2 text-center text-md font-medium -mb-px border-b-2 transition-colors",
      active
        ? "text-violet-500 border-violet-500"
        : "text-muted-foreground border-transparent hover:text-foreground"
    );

  return (
    <div className="flex gap-6 border-b border-border">
      <Link href="/sign-in" className={tabClass(isSignIn)}>
        Sign In
      </Link>
      <Link href="/sign-up" className={tabClass(isSignUp)}>
        Sign Up
      </Link>
    </div>
  );
}