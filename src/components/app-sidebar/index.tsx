import { Sidebar, SidebarInset } from "./components/sidebar"
import { SidebarContent } from "./components/sidebar-content"
import { SidebarFooter } from "./components/sidebar-footer"
import { SidebarHeader } from "./components/sidebar-header"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="sidebar" className="!flex">
      <SidebarHeader />

      <SidebarContent />

      <SidebarFooter />
    </Sidebar>
  )
}

export { SidebarInset }
