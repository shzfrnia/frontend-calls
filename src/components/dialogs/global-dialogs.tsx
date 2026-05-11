import { SettingsDialog } from "./settings-dialog"
import { LeaveServerDialog } from "./leave-server-dialog"
import { ChangeCallDialog } from "./change-call-dialog"
import { InviteToServerDialog } from "./invite-to-server-dialog"
import { JoinToServerDialog } from "./join-to-server-dialog"
import { CreateServerDialog } from "./create-server-dialog"
import { JoinToServerAcceptDialog } from "./join-to-server-accept-dialog"

export function GlobalDialogs() {
  return (
    <>
      <SettingsDialog />
      <LeaveServerDialog />
      <ChangeCallDialog />
      <InviteToServerDialog />
      <JoinToServerDialog />
      <CreateServerDialog />
      <JoinToServerAcceptDialog />
    </>
  )
}
