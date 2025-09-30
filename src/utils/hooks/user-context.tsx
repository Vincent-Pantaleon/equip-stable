"use client"

import { createContext, useContext } from "react"

type UserInfo = {
  role: string | null
  first_name: string | null
  last_name: string | null
  email: string | null
  office: string | null
}

export const UserContext = createContext<UserInfo | null>(null)
export const useInfo = () => useContext(UserContext)

export function UserProviderClient({
  children,
  value,
}: {
  children: React.ReactNode
  value: UserInfo | null
}) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
