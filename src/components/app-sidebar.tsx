import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  House,
  CirclePlus,
  Cat,
  Bird,
  Panda,
  Dog,
  Bug,
  Turtle,
  Snail,
} from "lucide-react"

const sidebarMenuButtonLg = cva("[&>svg]:size-5 flex justify-center")

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
} from "@/components/ui/sidebar"

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max)
}

const icons = [
  <Cat />,
  <Bird />,
  <Panda />,
  <Dog />,
  <Bug />,
  <Turtle />,
  <Snail />,
]

const navigates = new Array(3).fill("").map((_x, index) => {
  return {
    icon: icons[getRandomInt(icons.length)],
    name: `Девичий цитатник ${index}`,
  }
})

export function AppSidebar() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="!flex">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={cn(sidebarMenuButtonLg())}
              tooltip={t("sidebar.header.house-tooltip")}
              onClick={() => navigate("/home")}
            >
              <House />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="!overflow-auto">
        <SidebarGroup>
          {navigates.map((navItem, index) => {
            return (
              <SidebarMenuButton
                tooltip={navItem.name}
                onClick={() => navigate(`/${navItem.name}`)}
              >
                {navItem.icon}
              </SidebarMenuButton>
            )
          })}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          className={cn(sidebarMenuButtonLg())}
          tooltip={t("sidebar.footer.add-server-tooltip")}
          onClick={() => alert("make new server")}
        >
          <CirclePlus />
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}
