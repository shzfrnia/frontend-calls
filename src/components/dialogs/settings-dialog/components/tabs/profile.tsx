import { useAppSelector } from "@/hooks/use-store"

import { selectCurrentUser } from "@/store/slices/auth-slice"

export function SettingsProfile() {
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <div className="flex flex-col gap-3">
      {Object.entries(currentUser || {}).map(([field, value]) => {
        return (
          <div key={field} className="flex gap-2">
            <p>{field}:</p>
            <p>{value}</p>
          </div>
        )
      })}
    </div>
  )
}
