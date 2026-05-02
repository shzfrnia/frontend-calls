export type FormProps<T> = {
  onSubmit: (data: T) => void
  submitError?: string
  loading?: boolean
  defaultValues?: Partial<T>
}
