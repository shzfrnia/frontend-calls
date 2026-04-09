import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { EyeOffIcon, EyeIcon, ArrowLeft } from "lucide-react"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useZodTranslation } from "@/hooks/use-zod-translation"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const signInSchema = z.object({
  login: z
    .string()
    .min(6, 'forms.errors.min_length|{"count": 6}')
    .max(30, 'forms.errors.max_length|{"count": 30}'),
  password: z
    .string()
    .min(8, 'forms.errors.min_length|{"count": 8}')
    .max(30, 'forms.errors.max_length|{"count": 30}'),
})

const signUpSchema = signInSchema
  .extend({
    email: z.email({ message: "forms.errors.invalid-email-address" }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message:
          "forms.sign-in.confirm-password.errors.passwords-did-not-match",
        path: ["confirmPassword"],
      })
    }
  })

type FormType = z.infer<typeof signInSchema | typeof signUpSchema>

export function SignInForm({
  submitError,
  onSubmit,
  loading,
}: {
  submitError?: string
  onSubmit: (data: FormType) => void
  loading?: boolean
}) {
  const { zodT: t } = useZodTranslation()

  const [showPassword, setShowPassword] = useState(false)
  const [isCreationMode, setIsCreationMode] = useState(false)

  const form = useForm<FormType>({
    resolver: zodResolver(isCreationMode ? signUpSchema : signInSchema),
    defaultValues: { login: "", password: "", email: "" },
  })

  return (
    <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        {isCreationMode && (
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sign-in-form-email">
                  {t("common.email")}
                </FieldLabel>

                <Input
                  {...field}
                  id="sign-in-form-email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder={t("common.email")}
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
        )}

        <Controller
          name="login"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sign-in-form-login">
                {t("common.login")}
              </FieldLabel>

              <Input
                {...field}
                id="sign-in-form-login"
                aria-invalid={fieldState.invalid}
                placeholder={t(
                  isCreationMode
                    ? "common.login"
                    : "forms.sign-in.login.placeholder"
                )}
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

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sign-in-form-password">
                {t("common.password")}
              </FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="sign-in-form-password"
                  placeholder={t("common.password")}
                  type={showPassword ? "text" : "password"}
                  required
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    aria-label="show-password"
                    title="show-password"
                    size="icon-xs"
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>

              {fieldState.invalid && (
                <FieldError>
                  {t(fieldState.error?.message as string)}
                </FieldError>
              )}
            </Field>
          )}
        />

        {isCreationMode && (
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="sign-in-form-confirm-password">
                  {t("forms.sign-in.confirm-password.label")}
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="sign-in-form-confirm-password"
                    placeholder={t("forms.sign-in.confirm-password.label")}
                    type={showPassword ? "text" : "password"}
                    required
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label="show-password"
                      title="show-password"
                      size="icon-xs"
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError>
                    {t(fieldState.error?.message as string)}
                  </FieldError>
                )}
              </Field>
            )}
          />
        )}

        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => {
              setIsCreationMode((value) => !value)
              form.reset()
            }}
          >
            <ArrowLeft className={isCreationMode ? "" : "hidden"} />
            {t(
              isCreationMode
                ? "common.back"
                : "forms.sign-in.buttons.create-account"
            )}
          </Button>

          <Tooltip open={submitError ? undefined : false}>
            <TooltipTrigger asChild>
              <div className="flex-1">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={Boolean(submitError) || loading}
                >
                  {loading && <Spinner />}

                  {t(
                    isCreationMode
                      ? "forms.sign-in.buttons.create-account"
                      : "forms.sign-in.buttons.login"
                  )}
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>{submitError}</TooltipContent>
          </Tooltip>
        </Field>
      </FieldGroup>
    </form>
  )
}
