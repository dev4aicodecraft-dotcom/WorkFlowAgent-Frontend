"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { authApi } from "@/features/auth/api/auth.api";
// import { AcceptInviteForm } from "@/features/auth/components/accept-invite-form";
import type { InviteLookupResponse } from "@/types/api";
import { AuthShell } from "@/components/auth/auth-shell"; // use whatever auth layout wrapper you already have

function InviteInner() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [invite, setInvite] = useState<InviteLookupResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Missing invite token");
      return;
    }
    authApi
      .lookupInvite(token)
      .then((res) => setInvite(res.data))
      .catch(() => setError("Invite not valid"));
  }, [token]);

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-semibold">Invite not valid</h1>
        <p className="text-sm text-muted-foreground mt-2">{error}</p>
      </div>
    );
  }
  if (!invite) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
//   return <AcceptInviteForm token={token} invite={invite} />;
}

export default function InvitePage() {
  return (
    <Suspense>
      <InviteInner />
    </Suspense>
  );
}