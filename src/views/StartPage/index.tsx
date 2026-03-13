import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { InfoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { usePageTitle } from "@/hooks/usePageTitle"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useApplicationServer } from "@/services/app-server"

const formSchema = z.object({ url: z.string() })

export function StartPage() {
  const { setApplicationServerUrl } = useApplicationServer()
  const { t } = useTranslation()
  usePageTitle(t("views.start-page.title"))
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: "" },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setApplicationServerUrl(data.url)
    navigate("/")
  }

  return (
    <div className="flex flex-1 justify-center items-center">
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
