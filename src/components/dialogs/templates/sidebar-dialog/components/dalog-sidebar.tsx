import { ReactNode, type FC } from "react"
import { ChevronRight } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

const parentNavItemVariants = cva("", {
  variants: {
    variant: {
      default: "",
      destructive:
        "text-destructive active:text-destructive hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20 *:[svg]:text-destructive!",
    },
  },
})

function NavMain({
  items,
  onItemClick,
  splittedPath,
  canBeActive,
}: Omit<NavProps, "path" | "items"> & {
  splittedPath: Array<string>
  canBeActive: boolean
  items: NavItems
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{items.title}</SidebarGroupLabel>
      <SidebarMenu>
        {Object.entries(items.items).map(([key, item]) => {
          const hasChild = Boolean(item.items)

          return (
            <Collapsible
              key={item.title}
              asChild
              className="group/collapsible"
              defaultOpen={
                canBeActive && splittedPath.length === 3 ? true : undefined
              }
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    disabled={item.disabled}
                    className={cn(
                      parentNavItemVariants({ variant: item?.variant })
                    )}
                    variant={
                      canBeActive &&
                      splittedPath.length === 2 &&
                      splittedPath[1] === key
                        ? "outline"
                        : undefined
                    }
                    tooltip={item.title}
                    onClick={() => {
                      if (item.Component || item.onClick) {
                        onItemClick(`${key}`, item)
                      }
                    }}
                  >
                    {item.icon && <item.icon />}
                    <span className="mr-auto">{item.title}</span>
                    {item.rightIcon && <item.rightIcon />}

                    {hasChild && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {hasChild && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {Object.entries(item.items || {}).map(
                        ([subKey, subItem]) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              data-disabled={subItem.disabled}
                              className={
                                subItem.disabled
                                  ? "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:hover-not-allowed data-[disabled]:hover:bg-transparent"
                                  : "cursor-pointer"
                              }
                              isActive={
                                canBeActive &&
                                splittedPath.length === 3 &&
                                splittedPath[2] === subKey
                              }
                              asChild
                              onClick={() => {
                                if (
                                  (subItem.Component || subItem.onClick) &&
                                  !subItem.disabled
                                ) {
                                  onItemClick(`${key}|${subKey}`, item)
                                }
                              }}
                            >
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

type NavParent = {
  title: string
  icon?: FC
  rightIcon?: FC
  Component?: FC
  disabled?: boolean
  onClick?: (path: string) => void
  items?: Record<string, NavChild>
  variant?: VariantProps<typeof parentNavItemVariants>["variant"]
}

type NavChild = {
  title: string
  Component?: FC
  disabled?: boolean
  onClick?: (path: string) => void
}

type NavItems = {
  title: string
  items: Record<string, NavParent>
}

type NavProps = {
  onItemClick: (path: string, item: NavParent | NavChild) => void
  items: Items
  path: string
}

export type Items = Record<string, NavItems>

export function DialogSidebar({
  onItemClick,
  items,
  path,
  footer,
  ...props
}: React.ComponentProps<typeof Sidebar> & NavProps & { footer?: ReactNode }) {
  const splittedPath = path.split("|")

  return (
    <Sidebar {...props} className="h-full" collapsible="icon" variant="inset">
      <SidebarContent>
        {Object.entries(items).map(([key, navGroupInfo]) => {
          return (
            <NavMain
              key={key}
              canBeActive={splittedPath[0] === key}
              items={navGroupInfo}
              splittedPath={splittedPath}
              onItemClick={(path, item) => onItemClick(`${key}|${path}`, item)}
            />
          )
        })}
      </SidebarContent>

      {footer && <SidebarFooter>{footer}</SidebarFooter>}
    </Sidebar>
  )
}

export { SidebarFooter }
