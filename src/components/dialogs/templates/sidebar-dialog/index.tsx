import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type ComponentType,
  type ComponentProps,
} from "react"
import { VisuallyHidden } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { SidebarProvider } from "@/components/ui/sidebar"

import { DialogSidebar, type Items } from "./components/dalog-sidebar"
import { DialogSidebarContent } from "./components/dialog-sidebar-content"

const sidebarDialogVariants = cva("flex p-0 overflow-hidden", {
  variants: {
    size: {
      default: "w-[90vw] sm:max-w-[90vw] h-[90vh]",
      full: "w-[100vw] sm:max-w-[100vw] h-[100vh] rounded-none",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export function SidebarDialog({
  open,
  defaultPath,
  items,
  onOpenChange,
  size,
  footer,
  ...props
}: ComponentProps<typeof Dialog> &
  VariantProps<typeof sidebarDialogVariants> & {
    open: boolean
    onOpenChange: (value: boolean) => void
    defaultPath: string
    items: Items
    footer?: ReactNode
  }) {
  const [navPath, setNavPath] = useState<string>(defaultPath)

  const { Icon, title, Component } = useMemo<{
    Icon: ComponentType<{ className: string }>
    title: string
    Component: ComponentType
  }>(() => {
    const path = navPath.split("|").reverse()

    const parentKey: keyof typeof items = path.pop() as keyof typeof items
    const root = items[parentKey]

    const firstKey = path.pop()
    const firstItem = firstKey ? root.items[firstKey] : null
    const Icon = firstItem?.icon ?? (() => null)

    if (path.length && firstItem?.items) {
      const subKey = path.pop() as string
      const subItem = firstItem ? firstItem.items[subKey] : null

      return {
        Icon,
        title: subItem?.title ?? "",
        Component: subItem?.Component ?? (() => null),
      }
    }

    return {
      Icon,
      title: firstItem?.title ?? "",
      Component: firstItem?.Component ?? (() => null),
    }
  }, [navPath, items])

  useEffect(() => {
    if (open) {
      setNavPath(defaultPath)
    }
  }, [open, setNavPath, defaultPath])

  return (
    <Dialog {...props} open={open} onOpenChange={onOpenChange}>
      <VisuallyHidden.Root>
        <DialogTitle></DialogTitle>
      </VisuallyHidden.Root>

      <DialogContent
        showCloseButton={false}
        className={cn(sidebarDialogVariants({ size }))}
      >
        <VisuallyHidden.Root>
          <DialogDescription></DialogDescription>
        </VisuallyHidden.Root>

        <SidebarProvider className="flex flex-1 min-h-full h-full">
          <DialogSidebar
            footer={footer}
            items={items}
            path={navPath}
            onItemClick={(path, item) => {
              if (item.onClick) {
                item.onClick(path)
              } else {
                setNavPath(path)
              }
            }}
          />

          <DialogSidebarContent
            title={
              <div className="flex gap-2 items-center">
                <Icon className="h-[1.3em]" />
                <h1>{title}</h1>
              </div>
            }
          >
            <Component />
          </DialogSidebarContent>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}

export { Items }
