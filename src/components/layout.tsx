import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider open={false} defaultOpen={false}>
      <AppSidebar />

      <main className="flex flex-col w-full">{children}</main>
    </SidebarProvider>
  )
}

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResizablePanelGroup orientation="horizontal" className="border">
      {children}
    </ResizablePanelGroup>
  )
}

function LayoutLeftPanel({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ResizablePanel defaultSize="25%" minSize="190px" maxSize="360px">
        <div className="flex flex-col h-full dark:bg-neutral-900 bg-neutral-50">
          {children}
        </div>
      </ResizablePanel>

      <ResizableHandle />
    </>
  )
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <ResizablePanel defaultSize="75%">
      <div className="flex flex-col h-full overflow-hidden">{children}</div>
    </ResizablePanel>
  )
}

function LayoutHeaderPanel({
  children,
  className,
  separator = true,
}: {
  children: React.ReactNode
  className?: string
  separator?: boolean
}) {
  return (
    <div
      className={cn("h-[54px] max-h-[54px] flex flex-col shrink-0", className)}
    >
      <div className="flex flex-1 align-center p-2">{children}</div>
      {separator && <Separator />}
    </div>
  )
}

DefaultLayout.LayoutLeftPanel = LayoutLeftPanel
DefaultLayout.LayoutContent = LayoutContent
DefaultLayout.LayoutHeaderPanel = LayoutHeaderPanel

export { DefaultLayout }
