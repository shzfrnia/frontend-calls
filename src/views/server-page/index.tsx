import { useEffect, useState } from "react"
import { useNavigate, useParams, Outlet } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

import {
  selectServerById,
  selectServersLoaded,
} from "@/store/slices/servers-slice"

import { setServer } from "./store"

import { usePageTitle } from "@/hooks/use-page-title"
import { DefaultLayout } from "@/components/layout"

import { ServerHeader } from "./components/server-header"
import { ServerSettingsDialog } from "@/components/dialogs/server-settings-dialog"
import { ServerLeftPanel } from "./components/server-left-panel"

export function ServerPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { setTitle } = usePageTitle()
  const { serverID } = useParams()

  const serversIsLoaded = useAppSelector(selectServersLoaded)
  const server = useAppSelector((state) =>
    selectServerById(state, serverID as string)
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

        <ServerLeftPanel />
      </DefaultLayout.LayoutLeftPanel>

      <DefaultLayout.LayoutContent>
        <Outlet />
      </DefaultLayout.LayoutContent>
    </DefaultLayout>
  )
}
