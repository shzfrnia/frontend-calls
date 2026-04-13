let socket: WebSocket

const urlReplace = { "http://": "ws://", "https://": "wss://" }

export function getSocket(
  url: string,
  options: { token: string }
): typeof socket {
  if (!socket) {
    socket = new WebSocket(
      `${Object.entries(urlReplace).reduce((prev, [from, to]) => {
        return prev.replace(from, to)
      }, url)}/ws?token=${options.token}`
    )
  }

  return socket
}
