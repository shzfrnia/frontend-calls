let socket: WebSocket

const urlReplace = { "http://": "ws://", "https://": "wss://" }

export function getSocket(
  url?: string,
  options?: { token: string; micIsMuted: boolean; headphonesIsMuted: boolean }
): typeof socket {
  if (!socket && url && options) {
    const searchParams = new URLSearchParams()
    searchParams.set("token", options.token)
    searchParams.set("mic", String(options.micIsMuted))
    searchParams.set("head", String(options.headphonesIsMuted))

    socket = new WebSocket(
      `${Object.entries(urlReplace).reduce((prev, [from, to]) => {
        return prev.replace(from, to)
      }, url)}/api/v1/ws?${searchParams.toString()}`
    )
  }

  return socket
}
