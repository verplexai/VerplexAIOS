export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string | null
          avatar_url: string | null
          role: 'admin' | 'manager' | 'user' | 'client'
          department: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'manager' | 'user' | 'client'
          department?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'manager' | 'user' | 'client'
          department?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          logo_url: string | null
          website: string | null
          industry: string | null
          size_category: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          logo_url?: string | null
          website?: string | null
          industry?: string | null
          size_category?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          logo_url?: string | null
          website?: string | null
          industry?: string | null
          size_category?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_organizations: {
        Row: {
          id: string
          user_id: string
          organization_id: string
          role: string
          joined_at: string
        }
        Insert: {
          id?: string
          user_id: string
          organization_id: string
          role?: string
          joined_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          organization_id?: string
          role?: string
          joined_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          status: string
          priority: string
          organization_id: string
          project_manager_id: string | null
          client_id: string | null
          start_date: string | null
          end_date: string | null
          budget: number | null
          currency: string
          progress_percentage: number
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          status?: string
          priority?: string
          organization_id: string
          project_manager_id?: string | null
          client_id?: string | null
          start_date?: string | null
          end_date?: string | null
          budget?: number | null
          currency?: string
          progress_percentage?: number
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          status?: string
          priority?: string
          organization_id?: string
          project_manager_id?: string | null
          client_id?: string | null
          start_date?: string | null
          end_date?: string | null
          budget?: number | null
          currency?: string
          progress_percentage?: number
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: string
          priority: string
          project_id: string | null
          assigned_to: string | null
          created_by: string
          due_date: string | null
          estimated_hours: number | null
          actual_hours: number | null
          progress_percentage: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: string
          priority?: string
          project_id?: string | null
          assigned_to?: string | null
          created_by: string
          due_date?: string | null
          estimated_hours?: number | null
          actual_hours?: number | null
          progress_percentage?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: string
          priority?: string
          project_id?: string | null
          assigned_to?: string | null
          created_by?: string
          due_date?: string | null
          estimated_hours?: number | null
          actual_hours?: number | null
          progress_percentage?: number
          created_at?: string
          updated_at?: string
        }
      }
      files: {
        Row: {
          id: string
          filename: string
          original_filename: string
          file_path: string
          file_size_bytes: number
          file_type: string
          file_extension: string
          category_id: string | null
          project_id: string | null
          organization_id: string | null
          uploaded_by: string
          upload_timestamp: string
          last_accessed: string | null
          access_count: number
          is_public: boolean
          storage_bucket: string
          version: number
          parent_file_id: string | null
          metadata: Json
          file_hash: string | null
          thumbnail_path: string | null
          processing_status: string
          page_count: number | null
          word_count: number | null
          extracted_text: string | null
          duration_seconds: number | null
          width: number | null
          height: number | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          filename: string
          original_filename: string
          file_path: string
          file_size_bytes: number
          file_type: string
          file_extension: string
          category_id?: string | null
          project_id?: string | null
          organization_id?: string | null
          uploaded_by: string
          upload_timestamp?: string
          last_accessed?: string | null
          access_count?: number
          is_public?: boolean
          storage_bucket?: string
          version?: number
          parent_file_id?: string | null
          metadata?: Json
          file_hash?: string | null
          thumbnail_path?: string | null
          processing_status?: string
          page_count?: number | null
          word_count?: number | null
          extracted_text?: string | null
          duration_seconds?: number | null
          width?: number | null
          height?: number | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          filename?: string
          original_filename?: string
          file_path?: string
          file_size_bytes?: number
          file_type?: string
          file_extension?: string
          category_id?: string | null
          project_id?: string | null
          organization_id?: string | null
          uploaded_by?: string
          upload_timestamp?: string
          last_accessed?: string | null
          access_count?: number
          is_public?: boolean
          storage_bucket?: string
          version?: number
          parent_file_id?: string | null
          metadata?: Json
          file_hash?: string | null
          thumbnail_path?: string | null
          processing_status?: string
          page_count?: number | null
          word_count?: number | null
          extracted_text?: string | null
          duration_seconds?: number | null
          width?: number | null
          height?: number | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      file_permissions: {
        Row: {
          id: string
          file_id: string
          user_id: string | null
          organization_id: string | null
          permission_type: string
          granted_by: string
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          file_id: string
          user_id?: string | null
          organization_id?: string | null
          permission_type: string
          granted_by: string
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          file_id?: string
          user_id?: string | null
          organization_id?: string | null
          permission_type?: string
          granted_by?: string
          expires_at?: string | null
          created_at?: string
        }
      }
      client_portals: {
        Row: {
          id: string
          project_id: string | null
          client_id: string
          portal_name: string
          description: string | null
          is_active: boolean
          access_code: string | null
          custom_domain: string | null
          branding_config: Json
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id?: string | null
          client_id: string
          portal_name: string
          description?: string | null
          is_active?: boolean
          access_code?: string | null
          custom_domain?: string | null
          branding_config?: Json
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string | null
          client_id?: string
          portal_name?: string
          description?: string | null
          is_active?: boolean
          access_code?: string | null
          custom_domain?: string | null
          branding_config?: Json
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      legal_documents: {
        Row: {
          id: string
          title: string
          document_type: string
          file_id: string | null
          organization_id: string | null
          project_id: string | null
          status: string
          effective_date: string | null
          expiration_date: string | null
          signed_by: Json
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          document_type: string
          file_id?: string | null
          organization_id?: string | null
          project_id?: string | null
          status?: string
          effective_date?: string | null
          expiration_date?: string | null
          signed_by?: Json
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          document_type?: string
          file_id?: string | null
          organization_id?: string | null
          project_id?: string | null
          status?: string
          effective_date?: string | null
          expiration_date?: string | null
          signed_by?: Json
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      financial_records: {
        Row: {
          id: string
          record_type: string
          project_id: string | null
          organization_id: string | null
          amount: number
          currency: string
          description: string | null
          status: string
          due_date: string | null
          paid_date: string | null
          file_id: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          record_type: string
          project_id?: string | null
          organization_id?: string | null
          amount: number
          currency?: string
          description?: string | null
          status?: string
          due_date?: string | null
          paid_date?: string | null
          file_id?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          record_type?: string
          project_id?: string | null
          organization_id?: string | null
          amount?: number
          currency?: string
          description?: string | null
          status?: string
          due_date?: string | null
          paid_date?: string | null
          file_id?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string
          price_type: string
          base_price: number | null
          currency: string
          estimated_duration_hours: number | null
          requirements: Json
          deliverables: Json
          is_active: boolean
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category: string
          price_type?: string
          base_price?: number | null
          currency?: string
          estimated_duration_hours?: number | null
          requirements?: Json
          deliverables?: Json
          is_active?: boolean
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string
          price_type?: string
          base_price?: number | null
          currency?: string
          estimated_duration_hours?: number | null
          requirements?: Json
          deliverables?: Json
          is_active?: boolean
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      knowledge_articles: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string | null
          category: string
          tags: string[]
          status: string
          is_public: boolean
          view_count: number
          helpful_count: number
          author_id: string
          organization_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt?: string | null
          category: string
          tags?: string[]
          status?: string
          is_public?: boolean
          view_count?: number
          helpful_count?: number
          author_id: string
          organization_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string | null
          category?: string
          tags?: string[]
          status?: string
          is_public?: boolean
          view_count?: number
          helpful_count?: number
          author_id?: string
          organization_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          entity_type: string
          entity_id: string
          action: string
          user_id: string | null
          ip_address: string | null
          user_agent: string | null
          changes: Json
          metadata: Json
          timestamp: string
        }
        Insert: {
          id?: string
          entity_type: string
          entity_id: string
          action: string
          user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          changes?: Json
          metadata?: Json
          timestamp?: string
        }
        Update: {
          id?: string
          entity_type?: string
          entity_id?: string
          action?: string
          user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          changes?: Json
          metadata?: Json
          timestamp?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          category: string
          entity_type: string | null
          entity_id: string | null
          is_read: boolean
          action_url: string | null
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: string
          category: string
          entity_type?: string | null
          entity_id?: string | null
          is_read?: boolean
          action_url?: string | null
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          category?: string
          entity_type?: string | null
          entity_id?: string | null
          is_read?: boolean
          action_url?: string | null
          expires_at?: string | null
          created_at?: string
        }
      }
      file_categories: {
        Row: {
          id: string
          name: string
          description: string | null
          module: string
          allowed_file_types: string[] | null
          max_file_size_mb: number
          icon: string | null
          color: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          module: string
          allowed_file_types?: string[] | null
          max_file_size_mb?: number
          icon?: string | null
          color?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          module?: string
          allowed_file_types?: string[] | null
          max_file_size_mb?: number
          icon?: string | null
          color?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}