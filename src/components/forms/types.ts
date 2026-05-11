import type { ReactNode } from "react"
import type { UseFormReturn } from "react-hook-form"

export type FormProps<T> = {
  onSubmit: (data: T) => void
  submitError?: string
  loading?: boolean
  defaultValues?: Partial<T>
  children?: (form: UseFormReturn<T>) => ReactNode
}
