import { usePageTitle } from "@/hooks/use-page-title"
import { useApplicationServer } from "@/services/app-server"
import { useTranslation } from "react-i18next"

export function HomePage() {
  const { t } = useTranslation()
  usePageTitle(t("views.home-page.title"))
  const { setApplicationServerUrl } = useApplicationServer()

  return (
    <div>
      <div>{t("views.home-page.title")}</div>
      <button onClick={() => setApplicationServerUrl("")}>reset</button>
    </div>
  )
}
