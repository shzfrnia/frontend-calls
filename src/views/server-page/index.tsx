import { useTranslation } from "react-i18next"
import { useParams } from "react-router-dom"

import { usePageTitle } from "@/hooks/use-page-title"
import { DefaultLayout } from "@/components/layout"

export function ServerPage() {
  const { t } = useTranslation()
  usePageTitle(t("views.home-page.title"))

  const { id } = useParams()

  return (
    <DefaultLayout>
      <DefaultLayout.LayoutLeftPanel>{id}</DefaultLayout.LayoutLeftPanel>
      <DefaultLayout.LayoutContent>{id}</DefaultLayout.LayoutContent>
    </DefaultLayout>
  )
}
