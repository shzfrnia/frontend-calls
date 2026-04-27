let socket: WebSocket

const urlReplace = { "http://": "ws://", "https://": "wss://" }

export function getSocket(
  url?: string,
  options?: { token: string }
): typeof socket {
  if (!socket && url && options) {
    socket = new WebSocket(
      `${Object.entries(urlReplace).reduce((prev, [from, to]) => {
        return prev.replace(from, to)
      }, url)}/api/v1/ws?token=${options.token}`
    )
  }

  return socket
}
