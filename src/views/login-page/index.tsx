import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { ScanFace } from "lucide-react"
import { cva } from "class-variance-authority"

import { usePageTitle } from "@/hooks/use-page-title"

import { useApplicationServer } from "@/api/app-server"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tip } from "@/components/Tip"
import { ThemeToggler } from "@/components/theme-toggler"
import { LocalizationToggler } from "@/components/localization-toggler"
import { Separator } from "@/components/ui/separator"
import { Block } from "@/components/Block"

import { ServerDialog } from "./components/server-dialog"

const cardBlock = cva("py-6")

export function LoginPage() {
  const { t } = useTranslation()
  usePageTitle(t("views.login-page.title"))
  const navigate = useNavigate()
  const { applicationServerUrl, setApplicationServerUrl } =
    useApplicationServer()

  const [showServerDialog, setShowServerDialog] = useState(false)

  return (
    <div className="flex flex-1 justify-center items-center">
      <ServerDialog
        open={showServerDialog}
        onOpenChange={setShowServerDialog}
        onSubmit={({ url }) => setApplicationServerUrl(url)}
      />
      <Card className="w-[65%] py-0 min-w-[700px] max-w-[1000px]">
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
                Девичий цитатник
              </p>
              <p className="text-center text-xl font-semibold tracking-tight">
                💅🏻
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

              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">
                  {applicationServerUrl || "—"}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowServerDialog(true)}
                >
                  {t("common.edit")}
                </Button>
              </div>

              <Separator />
            </div>

            <div className="flex gap-3 justify-center">
              <Button size="icon-sm" disabled={!applicationServerUrl}>
                <ScanFace />
              </Button>
              <Button size="icon-sm" disabled={!applicationServerUrl}>
                <ScanFace />
              </Button>
              <Button size="icon-sm" disabled={!applicationServerUrl}>
                <ScanFace />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
