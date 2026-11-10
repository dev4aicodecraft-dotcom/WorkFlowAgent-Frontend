"use client";

import { AppHeader } from "@/components/layout/app-header";
import { WorkflowCanvas } from "@/components/workflow/workflow-canvas";
import { PropertiesPanel } from "@/components/workflow/properties-panel";
import { ChatPanel } from "@/components/workflow/chat-panel";
import { LogsPanel } from "@/components/workflow/logs-panel";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

export default function WorkflowEditorPage() {
  return (
    <div className="flex-1 min-h-0 flex flex-col p-4 gap-4">
      <AppHeader />

      <div className="flex-1 min-h-0 grid grid-cols-[1fr_300px] gap-4 items-stretch">
        {/* LEFT: canvas + bottom panels (resizable) */}
        <ResizablePanelGroup
          orientation="vertical"
          className="min-h-0 min-w-0 rounded-xl"
        >
          {/* Canvas */}
          <ResizablePanel defaultSize={70} minSize={35}>
            <div className="h-full min-h-0 rounded-xl border border-border overflow-hidden bg-card ">
              <WorkflowCanvas />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle  className="my-2"/>

          {/* Chat | Logs */}
          <ResizablePanel defaultSize={30} minSize={18}>
            <ResizablePanelGroup orientation="horizontal" className="h-full gap-0">
              <ResizablePanel defaultSize={50} minSize={25}>
                <div className="h-full min-h-0 pr-2">
                  <ChatPanel />
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={50} minSize={25}>
                <div className="h-full min-h-0 pl-2">
                  <LogsPanel />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* RIGHT properties stays full height */}
        <div className="min-h-0 h-full">
          <PropertiesPanel />
        </div>
      </div>
    </div>
  );
}