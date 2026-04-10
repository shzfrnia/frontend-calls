import { useTranslation } from "react-i18next"

import { useAppSelector } from "@/hooks/use-store"

import { selectCurrentUser } from "@/store/slices/auth-slice"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

function UserCardInfoRow({
  label,
  value,
  onChangeClick,
}: {
  label: string
  value?: string
  onChangeClick: () => void
}) {
  const { t } = useTranslation()

  return (
    <div className="flex justify-between">
      <div>
        <p className="font-bold">{label}</p>
        <div>
          {value ? (
            value
          ) : (
            <p className="text-muted-foreground">{t("common.not-set")}</p>
          )}
        </div>
      </div>

      <div>
        <Button size="sm" onClick={onChangeClick}>
          {t("common.edit")}
        </Button>
      </div>
    </div>
  )
}

export function UserCard() {
  const { t } = useTranslation()

  const currentUser = useAppSelector(selectCurrentUser)

  if (!currentUser) {
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex gap-2">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarFallback className="rounded-lg">FE</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{currentUser.displayName}</CardTitle>
            <CardDescription>{currentUser.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <UserCardInfoRow
          label={t("common.nickname")}
          value={currentUser.nickname || undefined}
          onChangeClick={() => alert("nickname")}
        />

        <UserCardInfoRow
          label={t("common.email")}
          value={currentUser.email}
          onChangeClick={() => alert("email")}
        />

        <UserCardInfoRow
          label={t("common.login")}
          value={currentUser.login}
          onChangeClick={() => alert("login")}
        />
      </CardContent>
    </Card>
  )
}
