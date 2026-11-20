import type { MemberResponse } from "@/types/api";
import { roleLabel } from "@/lib/roles";

export function MembersTable({ members }: { members: MemberResponse[] }) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/40 text-muted-foreground">
          <tr>
            <th className="text-left px-3 py-2 font-medium">Name</th>
            <th className="text-left px-3 py-2 font-medium">Email</th>
            <th className="text-left px-3 py-2 font-medium">Role</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id} className="border-t border-border">
              <td className="px-3 py-2">
                {m.first_name} {m.last_name}
              </td>
              <td className="px-3 py-2 text-muted-foreground">{m.email}</td>
              <td className="px-3 py-2">{roleLabel(m.role) ?? "Member"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}