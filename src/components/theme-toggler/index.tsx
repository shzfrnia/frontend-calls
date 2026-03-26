import { useTranslation } from "react-i18next"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useTheme } from "@/components/theme-provider"

export function ThemeToggler() {
  const { t } = useTranslation()
  const { setTheme, theme, themes } = useTheme()

  return (
    <Select defaultValue={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {themes.map((themeName) => {
            return (
              <SelectItem key={themeName} value={themeName}>
                {t(`common.theme.${themeName}`)}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
