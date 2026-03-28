import { useTranslation } from "react-i18next"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

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

export function ServerUrlDialog({
  defaultValues,
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (formData: FormData) => void
  defaultValues: FormData
}) {
  const { t } = useTranslation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function onFormSubmit(data: z.infer<typeof formSchema>) {
    onSubmit({ url: data.url })
    onOpenChange(false)
  }

  useEffect(() => {
    if (open) {
      const keys = Object.keys(defaultValues) as Array<
        keyof typeof defaultValues
      >
      keys.forEach((name) => form.setValue(name, defaultValues[name]))
    }
  }, [open, defaultValues, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form
          id="server-url-form"
          className="contents"
          onSubmit={form.handleSubmit(onFormSubmit)}
        >
          <DialogHeader>
            <DialogTitle>{t("dialogs.server-url.title")}</DialogTitle>
            <DialogDescription>
              {t("views.login-page.server-tip")}
            </DialogDescription>
          </DialogHeader>

          <Controller
            name="url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field title="url" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="url">
                  {t("dialogs.server-url.url.label")}
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
                    {t(
                      `dialogs.server-url.url.errors.${fieldState.error?.message}`
                    )}
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
            <Button type="submit">{t("common.save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
