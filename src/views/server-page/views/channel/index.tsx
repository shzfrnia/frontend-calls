import { useParams } from "react-router-dom"

export function Channel() {
  const { channelID } = useParams()

  return <div>channel content (calls) {channelID}</div>
}
