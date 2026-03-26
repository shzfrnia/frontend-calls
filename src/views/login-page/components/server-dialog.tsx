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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"

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

export function ServerDialog({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (formData: { url: string }) => void
}) {
  const { t } = useTranslation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: "" },
  })

  function onFormSubmit(data: z.infer<typeof formSchema>) {
    onSubmit({ url: data.url })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form
          id="server-url-form"
          className="contents"
          onSubmit={form.handleSubmit(onFormSubmit)}
        >
          <DialogHeader>
            <DialogTitle>
              {t("views.login-page.server-dialog.title")}
            </DialogTitle>
            <DialogDescription>
              {t("views.login-page.server-tip")}
            </DialogDescription>
          </DialogHeader>

          <Controller
            name="url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field title="url" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="input-group-url">
                  {t("views.login-page.server-url.label")}
                  <span className="text-destructive">*</span>
                </FieldLabel>

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

                {fieldState.invalid && (
                  <FieldError>
                    {t(
                      `views.login-page.server-dialog.url.errors.${fieldState.error?.message}`
                    )}
                  </FieldError>
                )}
              </Field>
            )}
          />

          <DialogFooter>
            <DialogClose>
              <Button variant="outline">{t("common.cancel")}</Button>
            </DialogClose>
            <Button type="submit">{t("common.save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
