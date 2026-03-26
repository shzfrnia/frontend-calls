import { useApplicationDataQuery } from "@/api/application-ws"
import { uuid4 } from "@/types/server"

export function useApplicationData() {
  const { data } = useApplicationDataQuery()

  const servers = data ? data.servers : []

  return {
    servers,
    getServer: (id: uuid4) => servers.find((server) => server.id === id),
    connectionState: data ? data.connectionState : "closed",
  }
}
