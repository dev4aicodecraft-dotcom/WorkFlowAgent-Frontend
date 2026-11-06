import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthCenter } from "@/components/auth/auth-center";

export default function ResetSuccessPage() {
  return (
    <AuthCenter backgroundSrc="/auth/forgot-bg.jpg">
      <div>
        <h1 className="text-2xl font-semibold">Password Reset Successful!</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your password has been updated successfully.
        </p>
      </div>

      <Button asChild className="w-full gradient-btn">
        <Link href="/sign-in">Continue to Sign In →</Link>
      </Button>
    </AuthCenter>
  );
}