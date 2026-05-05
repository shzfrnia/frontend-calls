import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Copy, Check } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"
import { useTimeout } from "@/hooks/use-timeout"

import { useGetInviteCodeMutation } from "@/api/servers"

import {
  selectInviteServerDialog,
  closeInviteServerDialog,
} from "@/store/slices/servers-slice"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"

import { copyToClipboard } from "@/utils/copy"

export function InviteToServer() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const inviteServer = useAppSelector(selectInviteServerDialog)
  const [copied, setCopied] = useState(false)
  const [getInviteCode, { isLoading, data }] = useGetInviteCodeMutation()

  useTimeout(
    () => {
      if (data) {
        copyToClipboard(data.code)
        setCopied(false)
      }
    },
    1500,
    copied
  )

  useEffect(() => {
    if (inviteServer) {
      getInviteCode(inviteServer.id)
    }
  }, [getInviteCode, inviteServer])

  return (
    <Dialog
      open={Boolean(inviteServer)}
      onOpenChange={(value) => !value && dispatch(closeInviteServerDialog())}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {t("dialog.invite-to-server.title", {
              serverName: inviteServer?.name,
            })}
          </DialogTitle>
          <DialogDescription>
            {t("dialog.invite-to-server.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center h-[45px]">
          {isLoading ? (
            <Spinner />
          ) : (
            <span className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
              {data?.code}
            </span>
          )}
        </div>

        <DialogFooter className="flex !justify-center">
          <Button disabled={isLoading} onClick={() => setCopied(true)}>
            {copied ? (
              <>
                {t("common.copied")} <Check />
              </>
            ) : (
              <>
                {t("common.copy")} <Copy />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
