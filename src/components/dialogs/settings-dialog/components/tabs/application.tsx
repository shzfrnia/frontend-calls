import { ThemeToggler } from "@/components/theme-toggler"
import { LocalizationToggler } from "@/components/localization-toggler"

export function SettingsApplication() {
  return (
    <div className="flex flex-col gap-3">
      <ThemeToggler />
      <LocalizationToggler />
    </div>
  )
}
