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
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      interactions_providers: {
        Row: {
          created_at: string
          id: number
          movie_id: number | null
          provider: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          movie_id?: number | null
          provider?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          movie_id?: number | null
          provider?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interactions_providers_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["movie_id"]
          },
        ]
      }
      interactions_videos: {
        Row: {
          created_at: string
          id: number
          movie_id: number | null
          progress: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          movie_id?: number | null
          progress?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          movie_id?: number | null
          progress?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interaction_video_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["movie_id"]
          },
        ]
      }
      interactions_visits: {
        Row: {
          created_at: string
          duration: number | null
          id: number
          movie_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          duration?: number | null
          id?: number
          movie_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          duration?: number | null
          id?: number
          movie_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intercation_visit_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["movie_id"]
          },
        ]
      }
      interactions_wishes: {
        Row: {
          created_at: string
          id: number
          movie_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          movie_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          movie_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interaction_wish_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["movie_id"]
          },
        ]
      }
      movies: {
        Row: {
          embedding_vector: string | null
          genres: Json | null
          id: number
          is_vectorized: boolean | null
          movie_id: number
          original_title: string | null
          overview: string | null
          poster_path: string | null
          tagline: string | null
          title: string
        }
        Insert: {
          embedding_vector?: string | null
          genres?: Json | null
          id?: number
          is_vectorized?: boolean | null
          movie_id: number
          original_title?: string | null
          overview?: string | null
          poster_path?: string | null
          tagline?: string | null
          title: string
        }
        Update: {
          embedding_vector?: string | null
          genres?: Json | null
          id?: number
          is_vectorized?: boolean | null
          movie_id?: number
          original_title?: string | null
          overview?: string | null
          poster_path?: string | null
          tagline?: string | null
          title?: string
        }
        Relationships: []
      }
      recommendations_history: {
        Row: {
          created_at: string
          id: number
          prompt: string | null
          recommendation_type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          prompt?: string | null
          recommendation_type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          prompt?: string | null
          recommendation_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      recommendations_movie_list: {
        Row: {
          created_at: string
          id: number
          movie_id: number | null
          recommendations_history_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          movie_id?: number | null
          recommendations_history_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          movie_id?: number | null
          recommendations_history_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_movie_list_recommendations_history_id_fkey"
            columns: ["recommendations_history_id"]
            isOneToOne: false
            referencedRelation: "recommendations_history"
            referencedColumns: ["id"]
          },
        ]
      }
      test: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      match_movies: {
        Args: {
          match_count: number
          match_threshold: number
          taste_embedding: string
        }
        Returns: {
          genres: Json
          id: number
          original_title: string
          overview: string
          similarity: number
          tagline: string
          title: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
