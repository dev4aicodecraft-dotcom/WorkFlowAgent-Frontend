"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { roleHome } from "@/lib/roles";
import type { UserRole } from "@/types/api";

export function RoleGuard({
  allow,
  children,
}: {
  allow: UserRole[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (!token) {
      router.replace("/sign-in");
      return;
    }
    if (user?.role && !allow.includes(user.role)) {
      router.replace(roleHome(user.role));
    }
  }, [token, user, allow, router]);

  if (!user?.role || !allow.includes(user.role)) {
    return (
      <div className="p-8 text-sm text-muted-foreground">Checking access…</div>
    );
  }
  return <>{children}</>;
}