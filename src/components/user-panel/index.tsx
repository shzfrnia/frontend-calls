import { useApplicationData } from "@/hooks/use-application-data"

export function UserPanel() {
  const { connectionState } = useApplicationData()

  const statusConfig = {
    connecting: { text: "Подключаемся…", color: "orange" },
    online: { text: "✅ Онлайн", color: "green" },
    closed: { text: "⚠️ Соединение разорвано", color: "gray" },
    error: { text: "❌ Ошибка подключения", color: "red" },
  }[connectionState]

  return <div>{statusConfig.text}</div>
}
