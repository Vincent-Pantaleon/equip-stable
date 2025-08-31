// providers/RealtimeProvider.tsx
"use client"

import { ReactNode, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { createClient } from "../supabase/client"

type Subscription = {
  table: string
  schema?: string
  queryKey: string[]
}

type Props = {
  children: ReactNode
  subscriptions: Subscription[]
}

export function RealtimeProvider({ children, subscriptions }: Props) {
  const queryClient = useQueryClient()
  const supabase = createClient()

  useEffect(() => {
    const channels = subscriptions.map(({ table, schema = "public", queryKey }) =>
      supabase
        .channel(`${table}-changes`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema,
            table,
            } as any,
          (payload) => {
            console.log(`Realtime change on ${table}:`, payload)
            queryClient.invalidateQueries({ queryKey })
          }
        )
        .subscribe()
    )

    return () => {
      channels.forEach((channel) => supabase.removeChannel(channel))
    }
  }, [supabase, queryClient, JSON.stringify(subscriptions)])

  return <>{children}</>
}
