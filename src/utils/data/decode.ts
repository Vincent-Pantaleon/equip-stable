// src/utils/server-actions/get-user-info.ts
'use server'

import { jwtDecode } from 'jwt-decode'
import { createClient } from '../supabase/server'

type JwtType = {
  user_role: string;
  first_name: string;
  last_name: string;
  email: string;
  // Update the type to match the SQL JSON array structure
  offices?: { id: string; office_name: string }[];
}

export async function GetUserInfo() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (!user || error) return null

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return null

  const jwt: JwtType = jwtDecode(session.access_token)
  const isSuperAdmin = jwt.user_role === 'superadmin'

  // Safely grab the first office in the array (if it exists)
  const primaryOffice = jwt.offices?.[0]

  const userInfo = {
    role: jwt.user_role,
    first_name: jwt.first_name,
    last_name: jwt.last_name,
    email: jwt.email,
    // Extract the ID and name from the array object
    office_id: isSuperAdmin ? null : (primaryOffice?.id ?? null),
    office_name: isSuperAdmin ? 'Global Access' : (primaryOffice?.office_name ?? 'Unassigned')
  }

  return userInfo
}