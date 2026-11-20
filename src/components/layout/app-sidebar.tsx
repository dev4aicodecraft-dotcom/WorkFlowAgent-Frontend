"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Workflow, Boxes, History, Cpu, Settings, Plus,
  Building2, Users, Landmark, ShieldCheck, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { roleLabel } from "@/lib/roles";
import type { UserRole } from "@/types/api";

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }> };
type NavSection = { label: string; items: NavItem[] };

const WORKSPACE: NavSection = {
  label: "Workspace",
  items: [
    { href: "/workflows", label: "Workflows", icon: Workflow },
    { href: "/node-library", label: "Node library", icon: Boxes },
    { href: "/history", label: "History", icon: History },
    { href: "/models", label: "Models", icon: Cpu },
    { href: "/settings", label: "Settings", icon: Settings },
  ],
};

const FIRM: NavSection = {
  label: "Firm",
  items: [
    { href: "/firm/organization", label: "Organization", icon: Landmark },
    { href: "/firm", label: "Members", icon: Users },
  ],
};

const PLATFORM: NavSection = {
  label: "Platform",
  items: [
    { href: "/platform", label: "Overview", icon: ShieldCheck },
    { href: "/platform/plans", label: "Plans", icon: Layers },
    { href: "/platform/firms", label: "Firms", icon: Building2 },
  ],
};

function sectionsFor(role?: UserRole | null): NavSection[] {
  if (role === "super_admin") return [PLATFORM];
  if (role === "admin") return [WORKSPACE, FIRM];
  return [WORKSPACE]; // user
}

export function AppSidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const sections = sectionsFor(user?.role);
  const label = roleLabel(user?.role);

  return (
    <aside className="w-60 shrink-0 border border-border bg-card flex flex-col m-4 rounded-lg">
      <div className="h-14 px-4 flex items-center gap-2">
        <span className="flex items-center justify-center">
          <Image src="/logo.svg" alt="WorkflowAgent" width={32} height={32} />
        </span>
        <span className="font-semibold">WorkflowAgent</span>
      </div>

      <nav className="flex-1 p-3 space-y-4">
        {sections.map((section) => (
          <div key={section.label} className="space-y-1">
            <div className="px-3 text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">
              {section.label}
            </div>
            {section.items.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-violet-600/15 text-violet-400"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-border space-y-3">
        <div className="flex items-center gap-2 px-1">
          <div className="size-8 rounded-full bg-violet-700/50" />
          <div className="text-sm min-w-0">
            <p className="font-medium leading-none truncate">
              {user?.name ?? "Account"}
            </p>
            {label && (
              <p className="text-xs text-muted-foreground">{label}</p>
            )}
          </div>
        </div>
        {user?.role !== "super_admin" && (
          <Button className="w-full gradient-btn gap-1" asChild>
            <Link href="/workflows/demo">
              <Plus className="size-4" />
              New workflow
            </Link>
          </Button>
        )}
      </div>
    </aside>
  );
}