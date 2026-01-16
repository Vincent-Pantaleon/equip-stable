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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          contact_number: string
          created_at: string
          date_of_use: string
          department_id: string
          designation_id: string
          equipment_id: string | null
          first_name: string
          grade_level_id: string
          id: string
          is_active: boolean
          last_name: string
          location_of_use_id: string
          office_id: string
          place_of_use_id: string
          purpose_id: string
          status: Database["public"]["Enums"]["booking_type"]
          subject_id: string
          time_of_end: string
          time_of_start: string
          type_of_request_id: string
          user_id: string
          venue_id: string | null
        }
        Insert: {
          contact_number: string
          created_at?: string
          date_of_use: string
          department_id: string
          designation_id: string
          equipment_id?: string | null
          first_name: string
          grade_level_id: string
          id?: string
          is_active?: boolean
          last_name: string
          location_of_use_id: string
          office_id: string
          place_of_use_id: string
          purpose_id: string
          status?: Database["public"]["Enums"]["booking_type"]
          subject_id: string
          time_of_end: string
          time_of_start: string
          type_of_request_id: string
          user_id?: string
          venue_id?: string | null
        }
        Update: {
          contact_number?: string
          created_at?: string
          date_of_use?: string
          department_id?: string
          designation_id?: string
          equipment_id?: string | null
          first_name?: string
          grade_level_id?: string
          id?: string
          is_active?: boolean
          last_name?: string
          location_of_use_id?: string
          office_id?: string
          place_of_use_id?: string
          purpose_id?: string
          status?: Database["public"]["Enums"]["booking_type"]
          subject_id?: string
          time_of_end?: string
          time_of_start?: string
          type_of_request_id?: string
          user_id?: string
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "department"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_designation_id_fkey"
            columns: ["designation_id"]
            isOneToOne: false
            referencedRelation: "designation"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipment_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_grade_level_id_fkey"
            columns: ["grade_level_id"]
            isOneToOne: false
            referencedRelation: "grade_level"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_location_of_use_id_fkey"
            columns: ["location_of_use_id"]
            isOneToOne: false
            referencedRelation: "location_of_use"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_place_of_use_id_fkey"
            columns: ["place_of_use_id"]
            isOneToOne: false
            referencedRelation: "place_of_use"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_purpose_id_fkey"
            columns: ["purpose_id"]
            isOneToOne: false
            referencedRelation: "purpose"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subject"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_type_of_request_id_fkey"
            columns: ["type_of_request_id"]
            isOneToOne: false
            referencedRelation: "type_of_request"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venue_type"
            referencedColumns: ["id"]
          },
        ]
      }
      department: {
        Row: {
          created_at: string
          department_name: string
          id: string
        }
        Insert: {
          created_at?: string
          department_name: string
          id?: string
        }
        Update: {
          created_at?: string
          department_name?: string
          id?: string
        }
        Relationships: []
      }
      designation: {
        Row: {
          created_at: string
          designation_name: string
          id: string
        }
        Insert: {
          created_at?: string
          designation_name: string
          id?: string
        }
        Update: {
          created_at?: string
          designation_name?: string
          id?: string
        }
        Relationships: []
      }
      equipment: {
        Row: {
          created_at: string
          date_acquired: string
          equipment_type_id: string
          id: string
          item_name: string
          office_id: string | null
          property_code: string | null
          reference_number: string
          serial_number: string
          status: Database["public"]["Enums"]["equipment_status"]
        }
        Insert: {
          created_at?: string
          date_acquired: string
          equipment_type_id: string
          id?: string
          item_name: string
          office_id?: string | null
          property_code?: string | null
          reference_number: string
          serial_number: string
          status?: Database["public"]["Enums"]["equipment_status"]
        }
        Update: {
          created_at?: string
          date_acquired?: string
          equipment_type_id?: string
          id?: string
          item_name?: string
          office_id?: string | null
          property_code?: string | null
          reference_number?: string
          serial_number?: string
          status?: Database["public"]["Enums"]["equipment_status"]
        }
        Relationships: [
          {
            foreignKeyName: "equipment_equipment_type_id_fkey"
            columns: ["equipment_type_id"]
            isOneToOne: false
            referencedRelation: "equipment_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment_type: {
        Row: {
          created_at: string
          id: string
          is_public: boolean
          office_id: string | null
          type_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_public?: boolean
          office_id?: string | null
          type_name: string
        }
        Update: {
          created_at?: string
          id?: string
          is_public?: boolean
          office_id?: string | null
          type_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_type_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
      grade_level: {
        Row: {
          created_at: string
          department_id: string | null
          grade_level: number | null
          id: string
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          grade_level?: number | null
          id?: string
        }
        Update: {
          created_at?: string
          department_id?: string | null
          grade_level?: number | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "grade_level_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "department"
            referencedColumns: ["id"]
          },
        ]
      }
      in_charge: {
        Row: {
          created_at: string
          id: string
          office_id: string
          profile_id: string
          role: Database["public"]["Enums"]["roles"]
        }
        Insert: {
          created_at?: string
          id?: string
          office_id: string
          profile_id: string
          role: Database["public"]["Enums"]["roles"]
        }
        Update: {
          created_at?: string
          id?: string
          office_id?: string
          profile_id?: string
          role?: Database["public"]["Enums"]["roles"]
        }
        Relationships: [
          {
            foreignKeyName: "in_charge_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "in_charge_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      location_of_use: {
        Row: {
          created_at: string
          id: string
          location_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          location_name: string
        }
        Update: {
          created_at?: string
          id?: string
          location_name?: string
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
      offices: {
        Row: {
          created_at: string
          id: string
          office_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          office_name: string
        }
        Update: {
          created_at?: string
          id?: string
          office_name?: string
        }
        Relationships: []
      }
      place_of_use: {
        Row: {
          created_at: string
          department_id: string | null
          id: string
          number: string | null
          room: Database["public"]["Enums"]["room_enums"] | null
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          id?: string
          number?: string | null
          room?: Database["public"]["Enums"]["room_enums"] | null
        }
        Update: {
          created_at?: string
          department_id?: string | null
          id?: string
          number?: string | null
          room?: Database["public"]["Enums"]["room_enums"] | null
        }
        Relationships: [
          {
            foreignKeyName: "place_of_use_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "department"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          is_online: boolean | null
          last_name: string | null
          office_id: string | null
          role: Database["public"]["Enums"]["roles"] | null
          school_id: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          is_online?: boolean | null
          last_name?: string | null
          office_id?: string | null
          role?: Database["public"]["Enums"]["roles"] | null
          school_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          is_online?: boolean | null
          last_name?: string | null
          office_id?: string | null
          role?: Database["public"]["Enums"]["roles"] | null
          school_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
      purpose: {
        Row: {
          created_at: string
          id: string
          purpose_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          purpose_name: string
        }
        Update: {
          created_at?: string
          id?: string
          purpose_name?: string
        }
        Relationships: []
      }
      subject: {
        Row: {
          created_at: string
          department_id: string | null
          id: string
          subject_name: string | null
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          id?: string
          subject_name?: string | null
        }
        Update: {
          created_at?: string
          department_id?: string | null
          id?: string
          subject_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subject_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "department"
            referencedColumns: ["id"]
          },
        ]
      }
      type_of_request: {
        Row: {
          created_at: string
          id: string
          type_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          type_name: string
        }
        Update: {
          created_at?: string
          id?: string
          type_name?: string
        }
        Relationships: []
      }
      venue: {
        Row: {
          created_at: string
          id: string
          office_id: string | null
          status: Database["public"]["Enums"]["venue_status"] | null
          venue_name: string | null
          venue_type: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          office_id?: string | null
          status?: Database["public"]["Enums"]["venue_status"] | null
          venue_name?: string | null
          venue_type?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          office_id?: string | null
          status?: Database["public"]["Enums"]["venue_status"] | null
          venue_name?: string | null
          venue_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "venue_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venue_venue_type_fkey"
            columns: ["venue_type"]
            isOneToOne: false
            referencedRelation: "venue_type"
            referencedColumns: ["id"]
          },
        ]
      }
      venue_type: {
        Row: {
          created_at: string
          id: string
          is_public: boolean
          office_id: string | null
          total_capacity: number | null
          venue_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_public?: boolean
          office_id?: string | null
          total_capacity?: number | null
          venue_name: string
        }
        Update: {
          created_at?: string
          id?: string
          is_public?: boolean
          office_id?: string | null
          total_capacity?: number | null
          venue_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "venue_type_office_id_fkey"
            columns: ["office_id"]
            isOneToOne: false
            referencedRelation: "offices"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
    }
    Enums: {
      booking_type: "pending" | "approved" | "declined" | "completed"
      equipment_status: "stored" | "out" | "maintenance" | "returned"
      roles: "user" | "moderator" | "administrator" | "superadmin"
      room_enums: "gs" | "hs"
      venue_status: "available" | "in_use" | "maintenance"
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
      booking_type: ["pending", "approved", "declined", "completed"],
      equipment_status: ["stored", "out", "maintenance", "returned"],
      roles: ["user", "moderator", "administrator", "superadmin"],
      room_enums: ["gs", "hs"],
      venue_status: ["available", "in_use", "maintenance"],
    },
  },
} as const
