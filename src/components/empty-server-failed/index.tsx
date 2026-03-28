import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IconServerOff } from "@tabler/icons-react"

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
        <EmptyTitle>Используемый сервер недоступен</EmptyTitle>
        <EmptyDescription>
          <p>{applicationServerUrl}</p>
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={() => navigate(0)}>Перезагрузить</Button>
        <Button variant="outline" onClick={() => setShowServerDialog(true)}>
          Сменить сервер
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
