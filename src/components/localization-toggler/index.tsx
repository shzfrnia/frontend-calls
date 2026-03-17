import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LocalizationToggler() {
  const { i18n } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">{i18n.language}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {(["ru", "en"] as const).map((themeName) => {
          return (
            <DropdownMenuItem
              key={themeName}
              disabled={i18n.language === themeName}
              onClick={() => i18n.changeLanguage(themeName)}
            >
              {themeName}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
