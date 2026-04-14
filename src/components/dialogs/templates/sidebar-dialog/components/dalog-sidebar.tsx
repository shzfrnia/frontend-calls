import { ReactNode, type FC } from "react"
import { ChevronRight } from "lucide-react"

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
                    variant={
                      canBeActive &&
                      splittedPath.length === 2 &&
                      splittedPath[1] == key
                        ? "outline"
                        : undefined
                    }
                    tooltip={item.title}
                    onClick={() => {
                      if (item.Component) {
                        onItemClick(`${key}`)
                      }
                    }}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>

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
                                if (subItem.Component && !subItem.disabled) {
                                  onItemClick(`${key}|${subKey}`)
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

type NavItems = {
  title: string
  items: Record<
    string,
    {
      title: string
      icon: FC
      Component?: FC
      disabled?: boolean
      items?: Record<
        string,
        { title: string; Component?: FC; disabled?: boolean }
      >
    }
  >
}

type NavProps = {
  onItemClick: (path: string) => void
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
              onItemClick={(path) => onItemClick(`${key}|${path}`)}
            />
          )
        })}
      </SidebarContent>

      {footer && <SidebarFooter>{footer}</SidebarFooter>}
    </Sidebar>
  )
}

export { SidebarFooter }
