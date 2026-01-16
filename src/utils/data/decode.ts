// src/utils/server-actions/get-user-info.ts
'use server'

import { jwtDecode } from 'jwt-decode'
import { createClient } from '../supabase/server'

type JwtType = {
  user_role: string;
  first_name: string;
  last_name: string;
  email: string;
  office_id: string;
  office_name: string;
}

export async function GetUserInfo() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return null

  const jwt: JwtType = jwtDecode(session.access_token)

  // These fields must be added via your custom_access_token_hook in Supabase
  const userInfo = {
    role: jwt.user_role,
    first_name: jwt.first_name,
    last_name: jwt.last_name,
    email: jwt.email,
    office_id: jwt.office_id,
    office_name: jwt.office_name
  }

  return userInfo
}
