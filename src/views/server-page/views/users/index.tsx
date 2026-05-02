import { useTranslation } from "react-i18next"
import { Users as UsersIcon } from "lucide-react"

import { DefaultLayout } from "@/components/layout"

export function Users() {
  const { t } = useTranslation()

  return (
    <>
      <DefaultLayout.LayoutHeaderPanel>
        <div className="flex items-center gap-3">
          <UsersIcon className="h-[1.4rem]" />
          <p>{t("common.members")}</p>
        </div>
      </DefaultLayout.LayoutHeaderPanel>

      <div>content</div>
    </>
  )
}
