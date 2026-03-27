import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { ScanFace, SquarePen, CircleCheck, CircleX } from "lucide-react"
import { cva } from "class-variance-authority"

import { usePageTitle } from "@/hooks/use-page-title"

import { useApplicationServer } from "@/api/app-server"
import { useLazyGetServerInfoQuery } from "@/api/system"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { LocalizationToggler } from "@/components/localization-toggler"
import { ThemeToggler } from "@/components/theme-toggler"
import { Tip } from "@/components/Tip"
import { Block } from "@/components/Block"
import { ApplicationVersions } from "@/components/application-versions"

import { ServerDialog } from "./components/server-dialog"

const cardBlock = cva("py-6")

export function LoginPage() {
  const { t } = useTranslation()
  usePageTitle(t("views.login-page.title"))
  const navigate = useNavigate()

  const {
    applicationServerUrl,
    setApplicationServerUrl,

    applicationServerStatus,
  } = useApplicationServer()

  const [trigger] = useLazyGetServerInfoQuery()

  const [showServerDialog, setShowServerDialog] = useState(false)

  useEffect(() => {
    trigger()
  }, [applicationServerUrl, trigger])

  const canLogin = applicationServerStatus === "success"

  return (
    <div className="flex flex-1 justify-center items-center">
      <ServerDialog
        defaultValues={{ url: applicationServerUrl }}
        open={showServerDialog}
        onOpenChange={setShowServerDialog}
        onSubmit={({ url }) => setApplicationServerUrl(url)}
      />
      <Card className="w-[65%] py-0 min-w-[700px] max-w-[1000px] overflow-hidden">
        <div className="flex">
          <Block
            variant="secondary"
            className={cardBlock({
              className:
                "flex flex-col justify-between w-[200px] max-w-[200px] px-4 w-full",
            })}
          >
            <div>
              <p className="text-center text-xl font-semibold tracking-tight">
                Цитатник
              </p>
            </div>

            <div className="flex flex-col gap-2 items-start">
              <ThemeToggler />
              <LocalizationToggler />
            </div>
          </Block>

          <div
            className={cardBlock({
              className: "flex flex-col gap-5 px-20 w-full",
            })}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-balance">
              {t("views.login-page.title")}
            </h1>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p>{t("common.server")}</p>
                <Tip>{t("views.login-page.server-tip")}</Tip>
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
                                {t(
                                  `views.login-page.server-url-is-not-supported`
                                )}
                              </TooltipContent>
                            </Tooltip>
                          ),
                        }[applicationServerStatus]
                      }
                    </div>
                  )}

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowServerDialog(true)}
                        >
                          <SquarePen />
                        </Button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{t("common.edit")}</TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <Separator />
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                size="icon-sm"
                disabled={!canLogin}
                onClick={() => navigate("/")}
              >
                <ScanFace />
              </Button>
              <Button size="icon-sm" disabled={!canLogin}>
                <ScanFace />
              </Button>
              <Button size="icon-sm" disabled={!canLogin}>
                <ScanFace />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <ApplicationVersions />
    </div>
  )
}
