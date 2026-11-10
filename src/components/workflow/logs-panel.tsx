export function LogsPanel() {
    return (
      <div className="h-full min-h-0 rounded-xl border border-border bg-card flex flex-col overflow-hidden">
        <div className="h-10 px-4 border-b border-border flex items-center justify-between text-sm">
          <span className="font-medium">Live execution logs</span>
          <span className="text-xs text-lime-400">status: running v3.2.1</span>
        </div>
  
        <div className="flex-1 min-h-0 overflow-y-auto p-4 grid grid-cols-[140px_1fr] gap-4 text-sm">
          <ul className="space-y-2">
            {["TRIGGER", "AI AGENT", "NOTIFY ADMIN"].map((step) => (
              <li key={step} className="flex items-center gap-2 text-xs">
                <span className="size-2 rounded-full bg-lime-400" />
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ul>
  
          <pre className="rounded-lg bg-black/40 border border-border p-3 text-[11px] text-lime-300/90 overflow-auto">
  {`{
    "sentiment": "positive",
    "score": 0.92,
    "summary": "User request completed",
    "tags": ["telegram", "crm"]
  }`}
          </pre>
        </div>
      </div>
    );
  }