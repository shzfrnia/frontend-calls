import { type ReactNode } from "react"

export function SecondaryBlock({
  children,
  header,
  description,
}: {
  children?: ReactNode
  header: string
  description: string
}) {
  return (
    <div>
      <div className="flex flex-col gap-1 mb-2">
        <h3 className="scroll-m-20 text-1xl font-semibold tracking-tight">
          {header}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div>{children}</div>
    </div>
  )
}
