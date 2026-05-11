import * as z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslation } from "react-i18next"

import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { FormProps } from "../types"

const formSchema = z.object({
  url: z.string().refine(
    (value) => {
      try {
        new URL(value)
        return true
      } catch {
        return false
      }
    },
    { message: "is-not-url" }
  ),
})

type FormData = { url: string }

export function ServerUrlForm({
  onSubmit,
  defaultValues,
}: FormProps<FormData>) {
  const { t } = useTranslation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  return (
    <form
      id="server-url-form"
      className="contents"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <DialogHeader>
        <DialogTitle>{t("dialog.server-url.title")}</DialogTitle>
        <DialogDescription>{t("views.login.server-tip")}</DialogDescription>
      </DialogHeader>

      <Controller
        name="url"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field title="url" data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="url">
              {t("dialog.server-url.url.label")}
              <span className="text-destructive">*</span>
            </FieldLabel>

            <Input
              {...field}
              id="url"
              aria-invalid={fieldState.invalid}
              placeholder="example.com"
              required
            />

            {fieldState.invalid && (
              <FieldError>
                {t(`dialog.server-url.url.errors.${fieldState.error?.message}`)}
              </FieldError>
            )}
          </Field>
        )}
      />

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            {t("common.cancel")}
          </Button>
        </DialogClose>
        <Button type="submit" disabled={!form.formState.isValid}>
          {t("common.save")}
        </Button>
      </DialogFooter>
    </form>
  )
}
