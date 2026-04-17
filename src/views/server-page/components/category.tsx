import { type ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui-proxy/button"

export function Category({
  name,
  children,
}: {
  name: string
  children: ReactNode
}) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{name}</p>

        <Button
          size="icon-xs"
          variant="ghost"
          tooltip={t("views.server.create-channel")}
          onClick={() => alert(t("views.server.create-channel"))}
        >
          <PlusCircle />
        </Button>
      </div>

      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}
