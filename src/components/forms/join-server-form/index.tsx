import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useZodTranslation } from "@/hooks/use-zod-translation"

import type { FormProps } from "../types"

const joinServerSchema = z.object({
  code: z.string().length(14, "forms.join-server.code.error"),
})

type FormType = z.infer<typeof joinServerSchema>

export function JoinServerForm({ onSubmit, children }: FormProps<FormType>) {
  const { zodT: t } = useZodTranslation()

  const form = useForm<FormType>({
    resolver: zodResolver(joinServerSchema),
  })

  return (
    <form id="join-server-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <Controller
          name="code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="join-server-form-code">
                {t("forms.join-server.code.label")}
              </FieldLabel>

              <Input
                {...field}
                id="join-server-form-code"
                aria-invalid={fieldState.invalid}
                placeholder="XXXX-XXXX-XXXX"
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

        {children && children(form)}
      </FieldGroup>
    </form>
  )
}
