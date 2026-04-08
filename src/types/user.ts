import { uuid4 } from "./server"

export type User = {
  email: string
  login: string
  nickname: string | null
  is_active: boolean
  is_superuser: boolean
  id: uuid4
  created_at: string
}
