// src/components/auth/auth-center.tsx
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export function AuthCenter({
  backgroundSrc,
  illustrationSrc,
  children,
}: {
  backgroundSrc: string;
  illustrationSrc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-svh overflow-hidden flex items-center justify-center p-6">
      <Image src={backgroundSrc} alt="" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-background/70 dark:bg-black/60" />
      <ThemeToggle />
      <div className="relative w-full max-w-md glass rounded-2xl p-8 space-y-6 text-center glow-purple">
        {illustrationSrc && (
          <Image
            src={illustrationSrc}
            alt=""
            width={96}
            height={96}
            className="mx-auto drop-shadow-[0_0_30px_rgba(124,58,237,0.45)]"
          />
        )}
        {children}
      </div>
    </div>
  );
}