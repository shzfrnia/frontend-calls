let socket: WebSocket

export function getSocket(url: string): typeof socket {
  if (!socket) {
    socket = new WebSocket(`ws://${url}/ws`)
  }

  return socket
}
