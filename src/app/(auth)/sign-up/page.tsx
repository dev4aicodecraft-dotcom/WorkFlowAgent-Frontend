import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { Check } from "lucide-react";

export default function SignUpPage() {
  return (
    <AuthShell
      backgroundSrc="/auth/sign-up-bg.jpg"
      headline={
        <>
          Create Your{" "}
          <span className="text-violet-500">WorkflowAgent</span> Account
        </>
      }
      features={[
        {
          title: "Free forever plan",
          icon: <Check className="size-4 text-violet-500" />,
        },
        {
          title: "Access to premium features",
          icon: <Check className="size-4 text-violet-500" />,
        },
        {
          title: "Join a thriving community",
          icon: <Check className="size-4 text-violet-500" />,
        },
      ]}
    >
      <SignUpForm />
    </AuthShell>
  );
}