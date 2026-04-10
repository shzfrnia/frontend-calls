import { useAppSelector } from "@/hooks/use-store"

import { selectCurrentUser } from "@/store/slices/auth-slice"

import { Button } from "@/components/ui/button"

import { MainBlock } from "../main-block"
import { SecondaryBlock } from "../secondary-block"
import { UserCard } from "../user-card"
import { Separator } from "@/components/ui/separator"

export function SettingsProfile() {
  const currentUser = useAppSelector(selectCurrentUser)

  if (!currentUser) {
    return null
  }

  return (
    <div className="flex flex-col gap-12">
      <UserCard />

      <Separator />

      <MainBlock header="Пароль и аутентификация">
        <Button onClick={() => alert("change password")}>
          Изменить пароль
        </Button>
      </MainBlock>

      <Separator />

      <SecondaryBlock
        header="Удаление учетной записи"
        description="Для удаления учетной записи требуется пароль."
      >
        <Button variant="destructive" onClick={() => alert("remove acc")}>
          Удалить учетную запись
        </Button>
      </SecondaryBlock>
    </div>
  )
}
