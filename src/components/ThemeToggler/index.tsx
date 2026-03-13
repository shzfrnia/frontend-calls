import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useTheme } from "@/components/theme-provider"

export function ThemeToggler() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">{theme}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {(["light", "dark", "system"] as const).map((themeName) => {
          return (
            <DropdownMenuItem
              key={themeName}
              disabled={theme === themeName}
              onClick={() => setTheme(themeName)}
            >
              {themeName}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
