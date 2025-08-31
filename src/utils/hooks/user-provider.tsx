import { GetUserInfo } from "../data/decode"
import { UserProviderClient } from "./user-context"

export default async function UserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // ✅ Runs on the server before rendering
  const userInfo = await GetUserInfo()

  return (
    <UserProviderClient value={userInfo}>
      {children}
    </UserProviderClient>
  )
}
