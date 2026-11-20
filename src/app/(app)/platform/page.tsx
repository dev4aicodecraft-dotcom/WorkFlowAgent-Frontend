"use client";
import { RoleGuard } from "@/components/auth/role-guard";

export default function PlatformPage() {
  return (
    <RoleGuard allow={["super_admin"]}>
      <div className="flex-1 p-6">
        <h1 className="text-xl font-semibold">Platform</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Site-wide settings for super admins.
        </p>
        {/* Call platformApi.metrics() here */}
      </div>
    </RoleGuard>
  );
}