import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { SquarePen, CircleCheck, CircleX } from "lucide-react"
import { toast } from "sonner"
import {
  IconBrandGoogleFilled,
  IconBrandAppleFilled,
  IconBrandDiscordFilled,
} from "@tabler/icons-react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { usePageTitle } from "@/hooks/use-page-title"
import { useAppSelector } from "@/hooks/use-store"

import { useApplicationServer } from "@/api/app-server"
import { useLoginMutation } from "@/api/auth"
import { useLazyMeQuery, useSignupMutation } from "@/api/users"

import { selectToken } from "@/store/slices/auth-slice"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { PixelLiquidBg } from "@/components/unlumen-ui/pixel-liquid-bg"

import { LocalizationToggler } from "@/components/localization-toggler"
import { ThemeToggler } from "@/components/theme-toggler"
import { Tip } from "@/components/Tip"
import { Block } from "@/components/Block"
import { ApplicationVersions } from "@/components/application-versions"
import { ServerUrlDialog } from "@/components/dialogs/server-url-dialog"
import { SignInForm } from "@/components/forms/sign-in-form"
import CatImage from "../../assets/cat.jpg"

const cardBlock = cva("py-6")

export function LoginPage() {
  const { t } = useTranslation()
  usePageTitle(t("views.login.title"))
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const [me, { isSuccess, isLoading: meIsLoading }] = useLazyMeQuery()
  const [signup, { isLoading: signupIsLoading }] = useSignupMutation()
  const token = useAppSelector(selectToken)

  const {
    applicationServerUrl,
    setApplicationServerUrl,
    applicationServerStatus,
  } = useApplicationServer()

  const afterLoginNavigate = useCallback(() => navigate("/"), [navigate])

  const tryLogin = useCallback(
    (data: { username: string; password: string }) => {
      const form = new FormData()
      form.append("username", data.username)
      form.append("password", data.password)

      login(form)
        .unwrap()
        .then(afterLoginNavigate)
        .catch((err) => {
          toast(t("common.something-went-wrong"), {
            description: t(`views.login.toast.${err.data.detail}`),
          })
        })
    },
    [login, afterLoginNavigate, t]
  )

  useEffect(() => {
    if (token) {
      me()
    }
  }, [token, me])

  useEffect(() => {
    if (isSuccess) {
      afterLoginNavigate()
    }
  }, [isSuccess, afterLoginNavigate])

  const [showServerDialog, setShowServerDialog] = useState(false)

  const canLogin = applicationServerStatus === "success"

  if (meIsLoading || isSuccess) {
    return null
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <PixelLiquidBg className="absolute" pixelSize={1} />
      <ServerUrlDialog
        defaultValues={{ url: applicationServerUrl }}
        open={showServerDialog}
        onOpenChange={setShowServerDialog}
        onSubmit={({ url }) => {
          setApplicationServerUrl(url)
          setShowServerDialog(false)
        }}
      />
      <Card className="w-[65%] py-0 my-5 min-w-[700px] max-w-[850px] overflow-hidden z-1 shadow-xl">
        <div className="flex">
          <Block
            variant="secondary-3"
            className={cn(
              cardBlock(),
              "flex flex-col justify-between",
              "w-full w-[200px] max-w-[200px]",
              "px-4"
            )}
          >
            <div className="flex justify-center">
              <Avatar className="w-[80%] h-auto">
                <AvatarImage src={CatImage} alt="Цитатник" />
              </Avatar>
            </div>

            <div className="flex flex-col gap-2 items-start">
              <ThemeToggler />
              <LocalizationToggler />
            </div>
          </Block>

          <div className={cn(cardBlock(), "flex flex-col gap-5 px-20 w-full")}>
            <h1 className="text-4xl font-extrabold tracking-tight text-balance">
              {t("views.login.title")}
            </h1>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p>{t("common.server")}</p>
                <Tip>{t("views.login.server-tip")}</Tip>
              </div>

              <div className="flex gap-1 justify-between items-center">
                <p className="text-muted-foreground">
                  {applicationServerUrl || "—"}
                </p>

                <div className="flex gap-2 items-center">
                  {applicationServerUrl && (
                    <div className="w-[20px] h-[20px] [&_*]:h-full [&_*]:w-full">
                      {
                        {
                          checking: <Spinner />,
                          success: <CircleCheck className="text-green-700" />,
                          failed: (
                            <Tooltip>
                              <TooltipTrigger>
                                <CircleX className="text-red-700" />
                              </TooltipTrigger>
                              <TooltipContent>
                                {t(`views.login.server-url-is-not-supported`)}
                              </TooltipContent>
                            </Tooltip>
                          ),
                        }[applicationServerStatus]
                      }
                    </div>
                  )}

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowServerDialog(true)}
                      >
                        <SquarePen />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{t("common.edit")}</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>

            <Separator />

            <SignInForm
              submitError={canLogin ? "" : t("views.login.server-tip")}
              loading={isLoading || signupIsLoading}
              onSubmit={(data) => {
                if ("email" in data) {
                  signup(data)
                    .unwrap()
                    .then((user) => {
                      tryLogin({
                        username: user.login,
                        password: data.password,
                      })
                    })
                    .catch((err) => {
                      toast(t("common.something-went-wrong"), {
                        description: t(`views.login.toast.${err.data.detail}`),
                      })
                    })
                } else {
                  tryLogin({ username: data.login, password: data.password })
                }
              }}
            />

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Separator className="flex-1" />
                <p className="text-sm text-muted-foreground text-center">
                  {t("common.or")}
                </p>
                <Separator className="flex-1" />
              </div>

              <div className="flex gap-3 justify-center">
                <Button
                  size="icon-sm"
                  disabled={true}
                  onClick={() => {
                    window.ipcRenderer.openExternal(applicationServerUrl)
                  }}
                >
                  <IconBrandGoogleFilled />
                </Button>
                <Button
                  size="icon-sm"
                  disabled={true}
                  onClick={() => {
                    navigate("/home/friends")
                  }}
                >
                  <IconBrandAppleFilled />
                </Button>
                <Button
                  size="icon-sm"
                  disabled={true}
                  onClick={() => {
                    navigate("/home/friends")
                  }}
                >
                  <IconBrandDiscordFilled />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <ApplicationVersions />
    </div>
  )
}
