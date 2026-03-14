import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

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
        <div className="flex flex-col">{children}</div>
      </ResizablePanel>

      <ResizableHandle />
    </>
  )
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <ResizablePanel defaultSize="75%">
      <div className="flex flex-col">{children}</div>
    </ResizablePanel>
  )
}

DefaultLayout.LayoutLeftPanel = LayoutLeftPanel
DefaultLayout.LayoutContent = LayoutContent

export { DefaultLayout }
