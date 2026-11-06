"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/auth/password-input";
import { GoogleButton } from "@/components/auth/google-button";
import { useSignUp } from "../hooks/use-auth";
import { Mail, User } from "lucide-react";
import { AuthTabs } from "@/components/auth/auth-tabs";

export function SignUpForm() {
  const signUp = useSignUp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setLocalError(null);

        if (password !== confirmPassword) {
          setLocalError("Passwords do not match");
          return;
        }

        signUp.mutate({ name, email, password, confirmPassword });
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
        <h2 className="text-2xl font-semibold">Start your free account</h2>
        <p className="text-sm text-muted-foreground">No credit card required</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
         <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          id="name"
          type="text"
          placeholder="Full Name"
          className="h-11 pl-9 bg-background/50"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                      id="email"
                      type="email"
                      placeholder="Email address"
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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <PasswordInput
          id="confirmPassword"
          placeholder="ConfirmPassword"
          className="h-11 bg-background/50"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {(localError || signUp.isError) && (
        <p className="text-sm text-destructive">
          {localError ?? (signUp.error as Error).message}
        </p>
      )}

      <Button
        type="submit"
        className="w-full gradient-btn h-11 text-base"
        disabled={signUp.isPending}
      >
        {signUp.isPending ? "Creating account..." : "Create Account →"}
      </Button>

      <div className="relative text-center text-xs text-muted-foreground">
        <span className="bg-card px-2 relative z-10">or continue with Google</span>
        <div className="absolute inset-x-0 top-1/2 border-t border-border" />
      </div>

      <GoogleButton label="Continue with Google" />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-violet-500 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}