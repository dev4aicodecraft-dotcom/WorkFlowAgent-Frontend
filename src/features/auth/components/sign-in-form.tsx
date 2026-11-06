"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/auth/password-input";
import { GoogleButton } from "@/components/auth/google-button";
import { useSignIn } from "../hooks/use-auth";
import { Mail } from "lucide-react";
import { AuthTabs } from "@/components/auth/auth-tabs";

export function SignInForm() {
  const signIn = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <form
      className="space-y-5 "
      onSubmit={(e) => {
        e.preventDefault();
        signIn.mutate({ email, password, rememberMe });
      }}
    >
      {/* Tabs  */}
      {/* <div className="flex gap-6 border-b border-border ">
        <Link href="/sign-in" className="pb-3 text-md text-center font-medium text-violet-500 border-b-2 border-violet-500 -mb-px w-1/2">
        Sign In
        </Link>
        <Link href="sign-up" className="pb-3 text-md text-center font-medium text-muted-foreground hover:text-foreground w-1/2">
        Sign Up
        </Link>
      </div> */}
      <AuthTabs/>

      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Sign in to your account</h2>
        <p className="text-sm text-muted-foreground">
          Enter your details to continue
        </p>
      </div>

      <GoogleButton />

      <div className="relative text-center text-xs text-muted-foreground">
        <span className="bg-card px-3 relative z-10">or</span>
        <div className="absolute inset-x-0 top-1/2 border-t border-border" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            className="h-11 pl-9 bg-background/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          placeholder="Password"
          className="h-11 bg-background/50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={rememberMe}
            onCheckedChange={(v) => setRememberMe(Boolean(v))}
            className="data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
          />
          Remember me
        </label>
        <Link href="/forgot-password" className="text-violet-500 hover:underline">
          Forgot password?
        </Link>
      </div>

      {signIn.isError && (
        <p className="text-sm text-destructive">
          {(signIn.error as Error).message}
        </p>
      )}

      <Button type="submit" className="w-full h-11 gradient-btn text-base" disabled={signIn.isPending}>
        {signIn.isPending ? "Signing in..." : "Sign In →"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-violet-500 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}