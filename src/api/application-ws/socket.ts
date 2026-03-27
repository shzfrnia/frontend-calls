let socket: WebSocket

const urlReplace = { "http://": "ws://", "https://": "wss://" }

export function getSocket(url: string): typeof socket {
  if (!socket) {
    socket = new WebSocket(
      `${Object.entries(urlReplace).reduce((prev, [from, to]) => {
        return prev.replace(from, to)
      }, url)}/ws`
    )
  }

  return socket
}
