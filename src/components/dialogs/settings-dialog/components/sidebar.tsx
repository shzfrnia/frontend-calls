import { type FC } from "react"
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

import { NavUser } from "./nav-user"

function NavMain({
  items,
  onNavClick,
  splittedPath,
  canBeActive,
}: Omit<NavProps, "navPath" | "items"> & {
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
                        onNavClick(`${key}`)
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
                      {Object.entries(item.items)?.map(([subKey, subItem]) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            isActive={
                              canBeActive &&
                              splittedPath.length === 3 &&
                              splittedPath[2] === subKey
                            }
                            asChild
                            onClick={() => {
                              if (subItem.Component) {
                                onNavClick(`${key}|${subKey}`)
                              }
                            }}
                          >
                            <span>{subItem.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
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
      items?: Record<string, { title: string; Component?: FC }>
    }
  >
}

type NavProps = {
  onNavClick: (navPath: string) => void
  items: Record<string, NavItems>
  navPath: string
}

export function SettingsSidebar({
  onNavClick,
  items,
  navPath,
  ...props
}: React.ComponentProps<typeof Sidebar> & NavProps) {
  const splittedPath = navPath.split("|")

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
              onNavClick={(navPath) => {
                onNavClick(`${key}|${navPath}`)
              }}
            />
          )
        })}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
