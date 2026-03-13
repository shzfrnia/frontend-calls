import { usePageTitle } from "@/hooks/usePageTitle"
import { useApplicationServer } from "@/services/app-server"
import { useTranslation } from "react-i18next"

export function HomePage() {
  const { t } = useTranslation()
  usePageTitle(t("views.home-page.title"))
  const { setApplicationServerUrl } = useApplicationServer()

  return (
    <div>
      <div>Home page</div>
      <button onClick={() => setApplicationServerUrl("")}>reset</button>
    </div>
  )
}
