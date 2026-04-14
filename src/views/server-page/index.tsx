// import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

import {
  selectServerById,
  selectServersLoaded,
} from "@/store/slices/servers-slice"

import { setServer } from "@/store/slices/views-slices/server-slice"

import { usePageTitle } from "@/hooks/use-page-title"
import { DefaultLayout } from "@/components/layout"

import { ServerHeader } from "./components/server-header"
import { ServerSettingsDialog } from "@/components/dialogs/server-settings-dialog"

export function ServerPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // const { t } = useTranslation()
  const { setTitle } = usePageTitle()

  const { id } = useParams()

  const serversIsLoaded = useAppSelector(selectServersLoaded)
  const server = useAppSelector((state) =>
    selectServerById(state, id as string)
  )

  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)

  useEffect(() => {
    if (serversIsLoaded) {
      if (server) {
        setTitle(server.name)
        dispatch(setServer(server))
      } else {
        navigate("/404")
      }
    }
  }, [serversIsLoaded, server, setTitle, dispatch, navigate])

  return (
    <DefaultLayout>
      <ServerSettingsDialog
        open={settingsDialogOpen}
        onOpenChange={setSettingsDialogOpen}
      />
      <DefaultLayout.LayoutLeftPanel>
        <DefaultLayout.LayoutHeaderPanel>
          <ServerHeader
            openSettingsDialogClick={() => setSettingsDialogOpen(true)}
          />
        </DefaultLayout.LayoutHeaderPanel>
      </DefaultLayout.LayoutLeftPanel>
      <DefaultLayout.LayoutContent>
        <DefaultLayout.LayoutHeaderPanel>
          {`${serversIsLoaded}`}
        </DefaultLayout.LayoutHeaderPanel>
      </DefaultLayout.LayoutContent>
    </DefaultLayout>
  )
}
