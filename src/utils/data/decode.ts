// src/utils/server-actions/get-user-info.ts
'use server'

import { jwtDecode } from 'jwt-decode'
import { createClient } from '../supabase/server'

export async function GetUserInfo() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return null

  const jwt: any = jwtDecode(session.access_token)

  // These fields must be added via your custom_access_token_hook in Supabase
  const userInfo = {
    role: jwt.user_role,
    first_name: jwt.first_name,
    last_name: jwt.last_name,
    email: jwt.email,
  }

  return userInfo
}
