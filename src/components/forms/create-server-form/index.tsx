import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Spinner } from "@/components/ui/spinner"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui-proxy/button"

import { useZodTranslation } from "@/hooks/use-zod-translation"

import type { FormProps } from "../types"
import type { ServerDraft } from "@/types/server"

const createServerSchema = z.object({
  name: z
    .string()
    .min(1, 'forms.errors.min_length|{"count": 1}')
    .max(30, 'forms.errors.max_length|{"count": 30}'),
})

type FormType = z.infer<typeof createServerSchema>

export function CreateServerForm({
  submitError,
  onSubmit,
  loading,
  defaultValues,
}: FormProps<ServerDraft>) {
  const { zodT: t } = useZodTranslation()

  const form = useForm<FormType>({
    resolver: zodResolver(createServerSchema),
    defaultValues,
  })

  return (
    <form id="create-server-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="create-server-form-name">
                {t("forms.create-server.name.label")}
              </FieldLabel>

              <Input
                {...field}
                id="create-server-form-name"
                aria-invalid={fieldState.invalid}
                placeholder={t("forms.create-server.name.placeholder")}
                required
              />

              {fieldState.invalid && (
                <FieldError>
                  {t(fieldState.error?.message as string)}
                </FieldError>
              )}
            </Field>
          )}
        />

        <Field orientation="horizontal">
          <Button
            type="submit"
            className="w-full"
            disabled={
              Boolean(submitError) || loading || !form.formState.isValid
            }
            tooltip={submitError}
          >
            {loading && <Spinner />}

            {t("forms.create-server.buttons.create")}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
