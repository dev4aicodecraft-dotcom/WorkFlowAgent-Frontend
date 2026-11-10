"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Workflow, Boxes, History, Cpu, Settings, Plus }from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const nav = [
    { href: "/workflows", label: "Workflows", icon: Workflow},
    { href: "/node-library", label: "Node library", icon: Boxes},
    { href: "/history", label: "History", icon: History},
    { href: "/models", label: "Models", icon: Cpu},
    { href: "/settings", label: "Settings", icon: Settings},
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-60 shrink-0 border border-border bg-card flex flex-col m-4 rounded-lg">
            <div className="h-14 px-4 flex items-center gap-2 ">
                <span className="flex items-center justify-center">
                <Image src="/logo.svg" alt="WorkflowAgent" width={32} height={32} />
                </span>
                <span className="font-semibold">WorkflowAgent</span>
            </div>

            <nav className="flex-1 p-3 space-y-1">
              {nav.map((item) => {
                const active = pathname.startsWith(item.href);
                const Icon = item.icon;
                return(
                    <Link key={item.href}
                      href={item.href}
                      className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                        active ? "bg-violet-600/15 text-violet-400" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}>
                        <Icon className="size-4"/>
                        {item.label}
                    </Link>
                );
              })}
            </nav>

            <div className="p-3 border-t border-border space-y-3">
                <div className="flex items-center gap-2 px-1">
                    <div className="size-8 rounded-full bg-violet-700/50"/>
                    <div className="text-sm">
                        <p className="font-medium leading-none">Alex Rivera</p>
                        <p className="text-xs text-muted-foreground">Admin</p>
                    </div>
                </div>
                <Button className="w-full gradient-btn gap-1"><Plus className="size-4"/>New workflow</Button>
            </div>
        </aside>
    )
}