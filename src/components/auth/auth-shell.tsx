import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../theme-toggle";

// type Feature = { title: string; description?: string };

type AuthShellProps = {
  headline: React.ReactNode;
  features: {title: string; icon?: React.ReactNode}[];
  visual?: React.ReactNode;
  backgroundSrc: string;
  children: React.ReactNode;
};

export function AuthShell({
  headline,
  features,
  visual,
  backgroundSrc,
  children,
}: AuthShellProps) {
  return (
    <div className="relative h-svh overflow-hidden grid lg:grid-cols-2">
        <ThemeToggle className="absolute top-4 right-4 z-20"/>

      {/* Left brand panel */}
      <aside className="relative hidden lg:flex min-h-0 h-full flex-col justify-between p-10 overflow-hidden">

        <Image
          src={backgroundSrc}
          alt=""
          fill
          priority
          className="object-cover"
        />
        {/* readability overlays for both themes */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-background/30 to-background/20 dark:from-black/40 dark:via-black/30 dark:to-black/20" />

        <Link href="/sign-in" className="relative z-10 flex items-center gap-2 ">
         <Image src="/logo.svg" alt="WorkflowAgent" width={32} height={32} />
          <span className="text-xl font-semibold tracking-tight">
            WorkflowAgent
          </span>
        </Link>

        <div className="relative z-10 space-y-8 max-w-md ml-15">
          <h1 className="text-4xl font-bold leading-tight">{headline}</h1>
          <ul className="space-y-4 ">
            {features.map((f) => (
             <li key={f.title} className="flex gap-3 items-center">
             {f.icon ?? <span className="size-2 rounded-full bg-violet-500" />}
             <span className="font-medium">{f.title}</span>
           </li>
            ))}
          </ul>
        </div>

        <div className="z-10 flex items-center gap-3 text-sm text-muted-foreground border rounded-full max-w-md px-1.5 py-1 bg-gradient-to-r from-white/30 to-white/10">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="size-8 rounded-full border-2 border-background bg-violet-700/60"
              />
            ))}
          </div>
          Trusted by 500k+ creators worldwide
        </div>

        {/* Placeholder for 3D art — swap with Image later */}
        {/* <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-24 opacity-80">
          {visual ?? (
            <div className="size-64 rounded-3xl bg-gradient-to-br from-violet-600/40 to-indigo-900/20 blur-sm glow-purple" />
          )}
        </div> */}
      </aside>

      {/* Right form card */}
      <main className="relative min-h-0 h-full overflow-y-auto flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/20 dark:bg-black/30 backdrop-blur-xl p-8 shadow-violet-400 shadow-[0_0_15px_2px]">
          {children}
        </div>
      </main>
    </div>
  );
}