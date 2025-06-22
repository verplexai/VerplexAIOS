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
          name: string
          role: 'founder' | 'team' | 'contractor' | 'client'
          avatar_url: string | null
          client_id: string | null
          company: string | null
          phone: string | null
          timezone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          role?: 'founder' | 'team' | 'contractor' | 'client'
          avatar_url?: string | null
          client_id?: string | null
          company?: string | null
          phone?: string | null
          timezone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: 'founder' | 'team' | 'contractor' | 'client'
          avatar_url?: string | null
          client_id?: string | null
          company?: string | null
          phone?: string | null
          timezone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          name: string
          company: string
          email: string
          phone: string | null
          website: string | null
          address: string | null
          stage: string
          status: string
          value: number | null
          assigned_to: string | null
          created_at: string
          updated_at: string
          last_contact: string | null
        }
        Insert: {
          id?: string
          name: string
          company: string
          email: string
          phone?: string | null
          website?: string | null
          address?: string | null
          stage?: string
          status?: string
          value?: number | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
          last_contact?: string | null
        }
        Update: {
          id?: string
          name?: string
          company?: string
          email?: string
          phone?: string | null
          website?: string | null
          address?: string | null
          stage?: string
          status?: string
          value?: number | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
          last_contact?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          client_id: string
          name: string
          description: string | null
          status: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold'
          progress: number | null
          start_date: string | null
          due_date: string | null
          completed_date: string | null
          budget: number | null
          spent: number | null
          assigned_team: string[] | null
          services: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          name: string
          description?: string | null
          status?: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold'
          progress?: number | null
          start_date?: string | null
          due_date?: string | null
          completed_date?: string | null
          budget?: number | null
          spent?: number | null
          assigned_team?: string[] | null
          services?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          name?: string
          description?: string | null
          status?: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold'
          progress?: number | null
          start_date?: string | null
          due_date?: string | null
          completed_date?: string | null
          budget?: number | null
          spent?: number | null
          assigned_team?: string[] | null
          services?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          category: 'nlp' | 'dashboards' | 'automation' | 'custom'
          base_price: number | null
          estimated_hours: number | null
          status: string
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category: 'nlp' | 'dashboards' | 'automation' | 'custom'
          base_price?: number | null
          estimated_hours?: number | null
          status?: string
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: 'nlp' | 'dashboards' | 'automation' | 'custom'
          base_price?: number | null
          estimated_hours?: number | null
          status?: string
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          client_id: string
          project_id: string | null
          invoice_number: string
          status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          amount: number
          issue_date: string
          due_date: string
          paid_date: string | null
          payment_method: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          project_id?: string | null
          invoice_number: string
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          amount?: number
          issue_date?: string
          due_date: string
          paid_date?: string | null
          payment_method?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          project_id?: string | null
          invoice_number?: string
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          amount?: number
          issue_date?: string
          due_date?: string
          paid_date?: string | null
          payment_method?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: 'todo' | 'in-progress' | 'review' | 'completed'
          priority: 'low' | 'medium' | 'high' | 'critical'
          assigned_to: string | null
          client_id: string | null
          project_id: string | null
          due_date: string | null
          progress: number | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: 'todo' | 'in-progress' | 'review' | 'completed'
          priority?: 'low' | 'medium' | 'high' | 'critical'
          assigned_to?: string | null
          client_id?: string | null
          project_id?: string | null
          due_date?: string | null
          progress?: number | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: 'todo' | 'in-progress' | 'review' | 'completed'
          priority?: 'low' | 'medium' | 'high' | 'critical'
          assigned_to?: string | null
          client_id?: string | null
          project_id?: string | null
          due_date?: string | null
          progress?: number | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
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