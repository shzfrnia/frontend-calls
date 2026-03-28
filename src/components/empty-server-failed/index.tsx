import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IconServerOff } from "@tabler/icons-react"
import { useTranslation } from "react-i18next"

import { useApplicationServer } from "@/api/app-server"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

import { ServerUrlDialog } from "../dialogs/server-url-dialog"

export function EmptyServerFailed() {
  const { t } = useTranslation()
  const { applicationServerUrl, setApplicationServerUrl } =
    useApplicationServer()
  const navigate = useNavigate()

  const [showServerDialog, setShowServerDialog] = useState(false)

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconServerOff className="text-red-700  dark:text-red-300" />
        </EmptyMedia>
        <EmptyTitle>{t("empty.server-failed.title")}</EmptyTitle>
        <EmptyDescription>
          <p>{applicationServerUrl}</p>
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={() => navigate(0)}>
          {t("empty.server-failed.buttons.try-connect")}
        </Button>
        <Button variant="outline" onClick={() => setShowServerDialog(true)}>
          {t("empty.server-failed.buttons.change-server")}
        </Button>
      </EmptyContent>

      <ServerUrlDialog
        defaultValues={{ url: applicationServerUrl }}
        open={showServerDialog}
        onOpenChange={setShowServerDialog}
        onSubmit={({ url }) => setApplicationServerUrl(url)}
      />
    </Empty>
  )
}
