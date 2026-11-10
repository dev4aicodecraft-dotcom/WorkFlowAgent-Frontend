"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";
import { useForgotPassword } from "@/features/auth/hooks/use-auth";

export default function ForgotPasswordPage() {
  const forgot = useForgotPassword();
  const [email, setEmail] = useState("");

  return (
    <div className="relative h-svh overflow-hidden grid lg:grid-cols-2">
      <ThemeToggle className="absolute top-4 right-4 z-20"/>

      {/* LEFT background */}
      <aside className="relative hidden lg:block min-h-0 h-full p-5">
        <Image
          src="/auth/forgot-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-75"
        />

         {/* readability overlays for both themes */}
         <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-background/30 to-background/20 dark:from-black/40 dark:via-black/30 dark:to-black/20" />

          <Link href="/sign-in" className="relative z-10 flex items-center gap-2 mt-3 ml-3">
           <Image src="/logo.svg" alt="WorkflowAgent" width={32} height={32} />
            <span className="text-xl font-semibold tracking-tight">
              WorkflowAgent
            </span>
          </Link>
      </aside>

      {/* RIGHT form */}
      <main className="relative min-h-0 h-full overflow-y-auto flex flex-col justify-center p-8 sm:p-12 bg-background">

        

        <div className="w-full max-w-md mx-auto space-y-6 shadow-violet-400 shadow-[0_0_15px_2px] p-4 rounded-md">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Reset Your Password</h1>
            <p className="text-muted-foreground">
              Enter your email address and we&apos;ll send you a reset link.
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              forgot.mutate({ email });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  className="pl-9 h-11 bg-background/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gradient-btn h-11"
              disabled={forgot.isPending}
            >
              {forgot.isPending ? "Sending..." : "Send Reset Link →"}
            </Button>
          </form>

          <p className="text-center">
            <Link
              href="/sign-in"
              className="text-sm text-violet-600 dark:text-violet-400 hover:underline"
            >
              Back to Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}