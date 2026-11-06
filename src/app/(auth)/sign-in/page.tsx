import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { Sparkles, Users, Infinity} from "lucide-react"

export default function SignInPage() {
  return (
    <AuthShell
      backgroundSrc="/auth/sign-in-bg.jpg"
      headline={
        <>
        Welcome Back to {""}
        <span className="text-violet-500">WorkflowAgent</span>
        </>
      }
      features={[
        { title: "AI-Powered Workspace" , icon: <Sparkles className="size-4 text-violet-500"/>},
        { title: "Real-time Collaboration" , icon: <Users className="size-4 text-violet-500"/>},
        { title: "Infinite Possibilities" , icon: <Infinity className="size-4 text-violet-500"/>},
      ]}
    >
      <SignInForm />
    </AuthShell>
  );
}