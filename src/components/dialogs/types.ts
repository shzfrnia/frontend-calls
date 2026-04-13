export type FormDialogProps<T> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (formData: T) => void
  defaultValues?: Partial<T>
}
