import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { InfoIcon, ScanFace } from "lucide-react"
import { cva } from "class-variance-authority"
import * as z from "zod"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { usePageTitle } from "@/hooks/use-page-title"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tip } from "@/components/Tip"
import { ThemeToggler } from "@/components/theme-toggler"
import { LocalizationToggler } from "@/components/localization-toggler"
import { Separator } from "@/components/ui/separator"
import { Block } from "@/components/Block"

import { useApplicationServer } from "@/api/app-server"

const cardBlock = cva("py-6")

const formSchema = z.object({ url: z.string() })

export function LoginPage() {
  const { setApplicationServerUrl } = useApplicationServer()
  const { t } = useTranslation()
  usePageTitle(t("views.login-page.title"))
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: "" },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setApplicationServerUrl(data.url)
  }

  return (
    <div className="flex flex-1 justify-center items-center">
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
                <p>Сервер</p>
                <Tip>{t("views.login-page.server-tip")}</Tip>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">https://127.0.0.1:9000</p>
                <Button size="sm" variant="outline">
                  {t("common.edit")}
                </Button>
              </div>

              <Separator />
            </div>

            <div className="flex gap-3 justify-center">
              <Button size="icon-sm">
                <ScanFace />
              </Button>
              <Button size="icon-sm">
                <ScanFace />
              </Button>
              <Button size="icon-sm">
                <ScanFace />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )

  return (
    <div className="flex flex-1 justify-center items-center">
      <ThemeToggler />
      <div className="w-1/2-dvw flex gap-10 flex-col">
        <Alert>
          <InfoIcon />
          <AlertTitle>{t("views.start-page.welcome-alert.title")}</AlertTitle>
          <AlertDescription>
            {t("views.start-page.welcome-alert.description")}
          </AlertDescription>
        </Alert>

        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field title="test" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="input-group-url">
                  {t("views.start-page.server-url.label")}
                  <span className="text-destructive">*</span>
                  <Badge variant="secondary" className="ml-auto">
                    test-build
                  </Badge>
                </FieldLabel>

                <div className="flex gap-2">
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="url"
                      aria-invalid={fieldState.invalid}
                      placeholder="example.com"
                      required
                    />
                    <InputGroupAddon>
                      <InputGroupText>https://</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <Button>Search</Button>
                </div>

                {fieldState.invalid && (
                  <FieldError>{t("common.field-is-required")}</FieldError>
                )}
              </Field>
            )}
          />
        </form>
      </div>
    </div>
  )
}
