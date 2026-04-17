import { cva, type VariantProps } from "class-variance-authority"

import { SidebarProvider } from "../app-sidebar/components/sidebar"
import { AppSidebar, SidebarInset } from "@/components/app-sidebar"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { cn } from "@/lib/utils"

import { Block } from "../Block"
import { UserPanel } from "../user-panel"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider open={false} defaultOpen={false}>
      <AppSidebar />

      <SidebarInset className="flex flex-col w-full">{children}</SidebarInset>
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
        <Block variant="secondary" className="flex flex-col h-full">
          <div className="flex-1">{children}</div>
          <div className="p-1">
            <UserPanel />
          </div>
        </Block>
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

const layoutHeaderPanel = cva("h-[54px] max-h-[54px] flex flex-col shrink-0", {
  variants: {
    variant: {
      default: "border-b",
      ghost: "absolute z-1",
    },
    defaultVariants: {
      variant: "default",
    },
  },
})

function LayoutHeaderPanel({
  children,
  className,
  variant,
}: VariantProps<typeof layoutHeaderPanel> & {
  children: React.ReactNode
  className?: string
  separator?: boolean
}) {
  return (
    <div className={cn(layoutHeaderPanel({ variant }), className)}>
      <div className="flex flex-1 align-center px-4 py-2">{children}</div>
    </div>
  )
}

DefaultLayout.LayoutLeftPanel = LayoutLeftPanel
DefaultLayout.LayoutContent = LayoutContent
DefaultLayout.LayoutHeaderPanel = LayoutHeaderPanel

export { DefaultLayout }
