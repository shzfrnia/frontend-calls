import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Copy, Check } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

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

import { copyToClipboard } from "@/utils/copy"

export function InviteToServer() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const inviteServer = useAppSelector(selectInviteServerDialog)
  const [copied, setCopied] = useState(false)
  const code = "912381283128"

  useEffect(() => {
    let id: NodeJS.Timeout | null = null

    if (copied) {
      copyToClipboard(code)

      id = setTimeout(() => {
        setCopied(false)
      }, 2000)
    }

    return () => {
      id && clearTimeout(id)
    }
  }, [copied, setCopied])

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

        <div className="flex justify-center">
          <span className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            {code}
          </span>
        </div>

        <DialogFooter className="flex !justify-center">
          <Button onClick={() => setCopied(true)}>
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
