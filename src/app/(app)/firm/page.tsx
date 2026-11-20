"use client";

import { useEffect, useState } from "react";
import { RoleGuard } from "@/components/auth/role-guard";
import { firmsApi } from "@/features/firms/api/firms.api";
import { InvitePanel } from "@/features/firms/components/invite-panel";
import { MembersTable } from "@/features/firms/components/members-table";
import type { InviteResponse, MemberResponse } from "@/types/api";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function FirmMembersPage() {
  const role = useAuthStore((s) => s.user?.role);
  const [members, setMembers] = useState<MemberResponse[]>([]);
  const [invites, setInvites] = useState<InviteResponse[]>([]);

  async function load() {
    const [m, i] = await Promise.all([
      firmsApi.members(),
      role === "admin" || role === "super_admin"
        ? firmsApi.listInvites()
        : Promise.resolve({ data: [] as InviteResponse[] }),
    ]);
    setMembers(m.data ?? []);
    setInvites(i.data ?? []);
  }

  useEffect(() => {
    load();
  }, [role]);

  return (
    <RoleGuard allow={["admin", "user", "super_admin"]}>
      <div className="flex-1 p-6 space-y-8">
        <div>
          <h1 className="text-xl font-semibold">Members</h1>
          <p className="text-sm text-muted-foreground">People in your firm.</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <MembersTable members={members} />
          {(role === "admin" || role === "super_admin") ? (
            <InvitePanel invites={invites} onChanged={load} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Ask an admin to invite colleagues.
            </p>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}