import { type ReactNode } from "react"

export function MainBlock({
  children,
  header,
}: {
  children: ReactNode
  header?: string
}) {
  return (
    <div>
      {header && (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
          {header}
        </h3>
      )}
      <div className="flex flex-col gap-5 items-baseline">{children}</div>
    </div>
  )
}
