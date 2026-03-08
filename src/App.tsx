import { useTranslation } from "react-i18next"

import { ThemeProvider } from "@/components/theme-provider"

import { ThemeToggler } from "@/components/ThemeToggler"
import { LocalizationToggler } from "@/components/LocalizationToggler"

function App() {
  const { t } = useTranslation()

  return (
    <ThemeProvider>
      <div className="flex gap-5 mb-5">
        <ThemeToggler />
        <LocalizationToggler />
      </div>

      <p>{t("title")}</p>
    </ThemeProvider>
  )
}

export default App
