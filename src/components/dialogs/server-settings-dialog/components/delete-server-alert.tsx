import { useNavigate } from "react-router-dom"
import { Trash2Icon } from "lucide-react"

import { useDeleteServerMutation } from "@/api/servers"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useAppSelector } from "@/hooks/use-store"
import { selectServer } from "@/views/server-page/store"

export function DeleteServerAlert(props: {
  open: boolean
  onOpenChange: (value: boolean) => void
}) {
  const navigate = useNavigate()

  const [deleteServer] = useDeleteServerMutation()
  const server = useAppSelector(selectServer)

  if (!server) {
    return null
  }

  return (
    <AlertDialog {...props}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete server?</AlertDialogTitle>
          <AlertDialogDescription>
            bla bla bla bla bla bla bla.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              navigate("/")
              deleteServer(server.id)
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
