import { useCallback } from "react"
import { useTranslation } from "react-i18next"

import { useAppDispatch, useAppSelector } from "@/hooks/use-store"

import {
  initCall,
  resetNextCall,
  selectNextChannel,
} from "@/store/slices/channel-slice"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useNavigate } from "react-router-dom"

export function ChangeCallDialog() {
  const dispatch = useAppDispatch()
  const navigte = useNavigate()
  const { t } = useTranslation()
  const nextChannel = useAppSelector(selectNextChannel)

  // const channelIsOpened = useMatch("/server/:serverID/channel/:channelID")

  const closeDialog = useCallback(() => {
    dispatch(resetNextCall())
  }, [dispatch])

  const applyDialog = useCallback(() => {
    if (nextChannel) {
      dispatch(initCall({ channel: nextChannel }))
    }
  }, [dispatch, nextChannel])

  return (
    <AlertDialog
      open={Boolean(nextChannel)}
      onOpenChange={(open) => !open && closeDialog()}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={applyDialog}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
