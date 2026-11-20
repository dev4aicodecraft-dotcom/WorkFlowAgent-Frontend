"use client";

import { useState } from "react";
import { Copy, Check, MailPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { firmsApi } from "@/features/firms/api/firms.api";
import type { InviteCreated, InviteResponse } from "@/types/api";

export function InvitePanel({
  invites,
  onChanged,
}: {
  invites: InviteResponse[];
  onChanged: () => void;
}) {
  const [email, setEmail] = useState("");
  const [created, setCreated] = useState<InviteCreated | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [copied, setCopied] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await firmsApi.createInvite({ email: email.trim() });
      setCreated(res.data);
      setEmail("");
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create invite");
    } finally {
      setPending(false);
    }
  }

  async function revoke(id: string) {
    await firmsApi.revokeInvite(id);
    onChanged();
  }

  return (
    <section className="rounded-lg border border-border bg-card p-4 space-y-4">
      <div>
        <h2 className="font-semibold">Invite a colleague</h2>
        <p className="text-xs text-muted-foreground">
          They join as a user (not admin). Copy the link once — it is not shown again.
        </p>
      </div>

      <form onSubmit={submit} className="flex gap-2">
        <Input
          type="email"
          required
          placeholder="name@yourfirm.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" className="gradient-btn gap-1" disabled={pending}>
          {pending ? <Loader2 className="size-4 animate-spin" /> : <MailPlus className="size-4" />}
          Invite
        </Button>
      </form>
      {error && <p className="text-sm text-destructive">{error}</p>}

      {created && (
        <div className="rounded-lg border border-violet-500/30 bg-violet-600/10 p-3 space-y-2">
          <p className="text-sm">
            Invite ready for <strong>{created.email}</strong>
          </p>
          <div className="flex gap-2">
            <Input readOnly value={created.invite_url} className="font-mono text-xs" />
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                await navigator.clipboard.writeText(created.invite_url);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
          </div>
        </div>
      )}

      <div>
        <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
          Open invites
        </p>
        {invites.length === 0 ? (
          <p className="text-sm text-muted-foreground">No invites waiting.</p>
        ) : (
          <ul className="divide-y divide-border rounded-lg border border-border">
            {invites.map((inv) => (
              <li key={inv.id} className="flex items-center gap-2 px-3 py-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm truncate">{inv.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Expires {new Date(inv.expires_at).toLocaleDateString()}
                  </p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => revoke(inv.id)}>
                  Revoke
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}