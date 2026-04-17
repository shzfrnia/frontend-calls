import { User } from "@/types/user"

export function getUserDisplayName(user: User) {
  return user.nickname || user.login
}
