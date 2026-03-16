import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { usePageTitle } from "@/hooks/use-page-title"
import { BookX } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

export function Page404() {
  usePageTitle("views.404.title")
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BookX />
        </EmptyMedia>
        <EmptyTitle>{t("views.404.empty.title")}</EmptyTitle>
        <EmptyDescription>{t("views.404.empty.description")}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={() => navigate(-1)}>{t("common.back")}</Button>
      </EmptyContent>
    </Empty>
  )
}
