import { useApplicationDataQuery } from "@/api/application-ws"

export function useApplicationData() {
  const { data } = useApplicationDataQuery()

  return {
    connectionState: data ? data.connectionState : "closed",
  }
}
