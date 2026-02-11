// src/utils/server-actions/get-user-info.ts
'use server'

import { jwtDecode } from 'jwt-decode'
import { createClient } from '../supabase/server'

type JwtType = {
  user_role: string;
  first_name: string;
  last_name: string;
  email: string;
  office_id?: string;
  office_name?: string;
}

export async function GetUserInfo() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return null

  const jwt: JwtType = jwtDecode(session.access_token)
  const isSuperAdmin = jwt.user_role === 'superadmin'
  
  // These fields must be added via your custom_access_token_hook in Supabase
  const userInfo = {
    role: jwt.user_role,
    first_name: jwt.first_name,
    last_name: jwt.last_name,
    email: jwt.email,
    // If superadmin, explicitly set to null, otherwise take jwt value or fallback
    office_id: isSuperAdmin ? null : (jwt.office_id ?? null),
    office_name: isSuperAdmin ? 'Global Access' : (jwt.office_name ?? 'Unassigned')
  }

  return userInfo
}
