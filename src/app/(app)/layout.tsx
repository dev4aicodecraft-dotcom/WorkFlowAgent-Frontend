import { AppSidebar } from "@/components/layout/app-sidebar";

export default function AppLayout ({ children } : { children: React.ReactNode }) {
    return (
        <div className="h-svh overflow-hidden flex bg-background text-foreground">
           <AppSidebar/>
           <div className="min-w-0 flex-1 flex flex-col min-h-0">{children}</div>
        </div>
    )
}