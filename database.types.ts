export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      department: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      designation: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      equipment: {
        Row: {
          code: string
          created_at: string
          date_acquired: string
          id: number
          item_name: string
          office_assigned: string | null
          reference: string
          serial_number: string
          status: Database["public"]["Enums"]["equipment_status"]
          type: number
        }
        Insert: {
          code: string
          created_at?: string
          date_acquired: string
          id?: number
          item_name: string
          office_assigned?: string | null
          reference: string
          serial_number: string
          status?: Database["public"]["Enums"]["equipment_status"]
          type: number
        }
        Update: {
          code?: string
          created_at?: string
          date_acquired?: string
          id?: number
          item_name?: string
          office_assigned?: string | null
          reference?: string
          serial_number?: string
          status?: Database["public"]["Enums"]["equipment_status"]
          type?: number
        }
        Relationships: [
          {
            foreignKeyName: "equipment_office_assigned_fkey"
            columns: ["office_assigned"]
            isOneToOne: false
            referencedRelation: "office"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "equipment_type"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment_type: {
        Row: {
          assigned_office: string | null
          available_count: number
          created_at: string
          id: number
          is_public: boolean | null
          total_count: number | null
          type: string
        }
        Insert: {
          assigned_office?: string | null
          available_count: number
          created_at?: string
          id?: number
          is_public?: boolean | null
          total_count?: number | null
          type: string
        }
        Update: {
          assigned_office?: string | null
          available_count?: number
          created_at?: string
          id?: number
          is_public?: boolean | null
          total_count?: number | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_type_assigned_office_fkey"
            columns: ["assigned_office"]
            isOneToOne: false
            referencedRelation: "office"
            referencedColumns: ["id"]
          },
        ]
      }
      grade_level: {
        Row: {
          created_at: string
          department: number
          id: number
          level: number
        }
        Insert: {
          created_at?: string
          department: number
          id?: number
          level: number
        }
        Update: {
          created_at?: string
          department?: number
          id?: number
          level?: number
        }
        Relationships: [
          {
            foreignKeyName: "grade_level_department_fkey"
            columns: ["department"]
            isOneToOne: false
            referencedRelation: "department"
            referencedColumns: ["id"]
          },
        ]
      }
      location_of_use: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string
          id: string
          is_viewed: boolean
          message: string
          recipient_id: string
          sender_id: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_viewed?: boolean
          message: string
          recipient_id: string
          sender_id: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_viewed?: boolean
          message?: string
          recipient_id?: string
          sender_id?: string
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      office: {
        Row: {
          created_at: string
          id: string
          in_charge: string | null
          office: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          in_charge?: string | null
          office?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          in_charge?: string | null
          office?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "office_in_charge_fkey"
            columns: ["in_charge"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      place_of_use: {
        Row: {
          created_at: string
          department: number
          id: number
          number: string
          room: Database["public"]["Enums"]["room_enums"]
        }
        Insert: {
          created_at?: string
          department: number
          id?: number
          number: string
          room: Database["public"]["Enums"]["room_enums"]
        }
        Update: {
          created_at?: string
          department?: number
          id?: number
          number?: string
          room?: Database["public"]["Enums"]["room_enums"]
        }
        Relationships: [
          {
            foreignKeyName: "place_of_use_department_fkey"
            columns: ["department"]
            isOneToOne: false
            referencedRelation: "department"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string
          first_name: string | null
          gender: Database["public"]["Enums"]["gender"] | null
          id: string
          is_online: boolean
          last_name: string | null
          office_assigned: string | null
          role: Database["public"]["Enums"]["app_role"] | null
          school_id: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          email: string
          first_name?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id: string
          is_online?: boolean
          last_name?: string | null
          office_assigned?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          school_id?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string
          first_name?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          is_online?: boolean
          last_name?: string | null
          office_assigned?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          school_id?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_office_assigned_fkey"
            columns: ["office_assigned"]
            isOneToOne: false
            referencedRelation: "office"
            referencedColumns: ["id"]
          },
        ]
      }
      purpose: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      requests: {
        Row: {
          contact_number: string
          created_at: string
          date_of_use: string
          department: string
          designation: string
          equipment: string
          first_name: string
          grade_level: string
          id: string
          last_name: string
          location_of_use: string
          place_of_use: string
          purpose: string
          status: Database["public"]["Enums"]["request_status_enums"]
          subject: string
          time_of_end: string
          time_of_start: string
          type_of_request: string
          user_id: string | null
        }
        Insert: {
          contact_number: string
          created_at?: string
          date_of_use: string
          department: string
          designation: string
          equipment: string
          first_name: string
          grade_level: string
          id?: string
          last_name: string
          location_of_use: string
          place_of_use: string
          purpose: string
          status?: Database["public"]["Enums"]["request_status_enums"]
          subject: string
          time_of_end: string
          time_of_start: string
          type_of_request: string
          user_id?: string | null
        }
        Update: {
          contact_number?: string
          created_at?: string
          date_of_use?: string
          department?: string
          designation?: string
          equipment?: string
          first_name?: string
          grade_level?: string
          id?: string
          last_name?: string
          location_of_use?: string
          place_of_use?: string
          purpose?: string
          status?: Database["public"]["Enums"]["request_status_enums"]
          subject?: string
          time_of_end?: string
          time_of_start?: string
          type_of_request?: string
          user_id?: string | null
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["app_permission"]
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      subject: {
        Row: {
          created_at: string
          department: number
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          department: number
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          department?: number
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "subject_department_fkey"
            columns: ["department"]
            isOneToOne: false
            referencedRelation: "department"
            referencedColumns: ["id"]
          },
        ]
      }
      type_of_request: {
        Row: {
          created_at: string
          id: number
          name: Database["public"]["Enums"]["request_type"]
        }
        Insert: {
          created_at?: string
          id?: number
          name: Database["public"]["Enums"]["request_type"]
        }
        Update: {
          created_at?: string
          id?: number
          name?: Database["public"]["Enums"]["request_type"]
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      venue: {
        Row: {
          created_at: string
          id: number
          reference: string
          status: Database["public"]["Enums"]["venue_status"]
          type: number
        }
        Insert: {
          created_at?: string
          id?: number
          reference: string
          status?: Database["public"]["Enums"]["venue_status"]
          type: number
        }
        Update: {
          created_at?: string
          id?: number
          reference?: string
          status?: Database["public"]["Enums"]["venue_status"]
          type?: number
        }
        Relationships: [
          {
            foreignKeyName: "venue_type_fkey"
            columns: ["type"]
            isOneToOne: false
            referencedRelation: "venue_type"
            referencedColumns: ["id"]
          },
        ]
      }
      venue_type: {
        Row: {
          available_count: number
          created_at: string
          id: number
          is_public: boolean
          name: string
          total_capacity: number | null
          total_count: number
        }
        Insert: {
          available_count: number
          created_at?: string
          id?: number
          is_public?: boolean
          name: string
          total_capacity?: number | null
          total_count: number
        }
        Update: {
          available_count?: number
          created_at?: string
          id?: number
          is_public?: boolean
          name?: string
          total_capacity?: number | null
          total_count?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      custom_access_token_hook: {
        Args: { event: Json }
        Returns: Json
      }
    }
    Enums: {
      app_permission:
        | "status_change"
        | "send_message"
        | "add_user"
        | "edit_user"
        | "edit_tables"
        | "send_request"
        | "receive_message"
      app_role: "administrator" | "user" | "moderator" | "superadmin"
      department_enums:
        | "kindergarten"
        | "elementary"
        | "high_school"
        | "senior_high_school"
      equipment_status: "stored" | "out" | "returned" | "maintenance"
      gender: "male" | "female" | "other"
      request_status_enums: "pending" | "approved" | "declined" | "completed"
      request_type: "venue" | "equipment"
      room_enums: "gs" | "hs"
      venue_status: "open" | "closed" | "in_use" | "available" | "maintenance"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_permission: [
        "status_change",
        "send_message",
        "add_user",
        "edit_user",
        "edit_tables",
        "send_request",
        "receive_message",
      ],
      app_role: ["administrator", "user", "moderator", "superadmin"],
      department_enums: [
        "kindergarten",
        "elementary",
        "high_school",
        "senior_high_school",
      ],
      equipment_status: ["stored", "out", "returned", "maintenance"],
      gender: ["male", "female", "other"],
      request_status_enums: ["pending", "approved", "declined", "completed"],
      request_type: ["venue", "equipment"],
      room_enums: ["gs", "hs"],
      venue_status: ["open", "closed", "in_use", "available", "maintenance"],
    },
  },
} as const
