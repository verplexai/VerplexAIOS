import { supabase, handleSupabaseError } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Tables = Database['public']['Tables'];

// Generic API service class
class ApiService<T extends keyof Tables> {
  constructor(private tableName: T) {}

  async getAll(options?: {
    select?: string;
    filter?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
  }) {
    try {
      let query = supabase.from(this.tableName).select(options?.select || '*');
      
      if (options?.filter) {
        Object.entries(options.filter).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            query = query.in(key, value);
          } else {
            query = query.eq(key, value);
          }
        });
      }
      
      if (options?.orderBy) {
        query = query.order(options.orderBy.column, { 
          ascending: options.orderBy.ascending ?? true 
        });
      }
      
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      
      const { data, error } = await query;
      if (error) handleSupabaseError(error);
      return data;
    } catch (error) {
      handleSupabaseError(error);
    }
  }

  async getById(id: string, select?: string) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(select || '*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) handleSupabaseError(error);
      return data;
    } catch (error) {
      handleSupabaseError(error);
    }
  }

  async create(data: Tables[T]['Insert']) {
    try {
      const { data: result, error } = await supabase
        .from(this.tableName)
        .insert(data)
        .select()
        .single();
      
      if (error) handleSupabaseError(error);
      return result;
    } catch (error) {
      handleSupabaseError(error);
    }
  }

  async update(id: string, updates: Tables[T]['Update']) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) handleSupabaseError(error);
      return data;
    } catch (error) {
      handleSupabaseError(error);
    }
  }

  async delete(id: string) {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('id', id);
      
      if (error) handleSupabaseError(error);
      return true;
    } catch (error) {
      handleSupabaseError(error);
    }
  }

  async count(filter?: Record<string, any>) {
    try {
      let query = supabase.from(this.tableName).select('*', { count: 'exact', head: true });
      
      if (filter) {
        Object.entries(filter).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }
      
      const { count, error } = await query;
      if (error) handleSupabaseError(error);
      return count || 0;
    } catch (error) {
      handleSupabaseError(error);
    }
  }
}

// Specific service instances
export const profilesApi = new ApiService('profiles');
export const organizationsApi = new ApiService('organizations');
export const userOrganizationsApi = new ApiService('user_organizations');
export const projectsApi = new ApiService('projects');
export const tasksApi = new ApiService('tasks');
export const filesApi = new ApiService('files');
export const filePermissionsApi = new ApiService('file_permissions');
export const clientPortalsApi = new ApiService('client_portals');
export const legalDocumentsApi = new ApiService('legal_documents');
export const financialRecordsApi = new ApiService('financial_records');
export const servicesApi = new ApiService('services');
export const knowledgeArticlesApi = new ApiService('knowledge_articles');
export const activityLogsApi = new ApiService('activity_logs');
export const notificationsApi = new ApiService('notifications');
export const fileCategoriesApi = new ApiService('file_categories');

// Authentication API
export const authApi = {
  async signUp(email: string, password: string, metadata?: Record<string, any>) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      
      if (error) handleSupabaseError(error);
      return data;
    } catch (error) {
      handleSupabaseError(error);
    }
  },

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) handleSupabaseError(error);
      return data;
    } catch (error) {
      handleSupabaseError(error);
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) handleSupabaseError(error);
    } catch (error) {
      handleSupabaseError(error);
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) handleSupabaseError(error);
      return user;
    } catch (error) {
      handleSupabaseError(error);
    }
  },

  async updateProfile(updates: Tables['profiles']['Update']) {
    try {
      const user = await this.getCurrentUser();
      if (!user) throw new Error('No authenticated user');
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) handleSupabaseError(error);
      return data;
    } catch (error) {
      handleSupabaseError(error);
    }
  }
};

// Analytics API
export const analyticsApi = {
  async getDashboardStats() {
    try {
      const [
        projectsCount,
        tasksCount,
        filesCount,
        activeProjects
      ] = await Promise.all([
        projectsApi.count(),
        tasksApi.count(),
        filesApi.count(),
        projectsApi.count({ status: 'active' })
      ]);

      return {
        totalProjects: projectsCount,
        totalTasks: tasksCount,
        totalFiles: filesCount,
        activeProjects: activeProjects
      };
    } catch (error) {
      handleSupabaseError(error);
    }
  },

  async getRecentActivity(limit = 10) {
    try {
      return await activityLogsApi.getAll({
        orderBy: { column: 'timestamp', ascending: false },
        limit
      });
    } catch (error) {
      handleSupabaseError(error);
    }
  },

  async getProjectMetrics() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          status,
          priority,
          progress_percentage,
          budget,
          organization_id
        `);
      
      if (error) handleSupabaseError(error);
      
      const metrics = {
        byStatus: {} as Record<string, number>,
        byPriority: {} as Record<string, number>,
        avgProgress: 0,
        totalBudget: 0
      };
      
      if (data) {
        data.forEach(project => {
          metrics.byStatus[project.status] = (metrics.byStatus[project.status] || 0) + 1;
          metrics.byPriority[project.priority] = (metrics.byPriority[project.priority] || 0) + 1;
          metrics.avgProgress += project.progress_percentage || 0;
          metrics.totalBudget += Number(project.budget) || 0;
        });
        
        metrics.avgProgress = Math.round(metrics.avgProgress / data.length);
      }
      
      return metrics;
    } catch (error) {
      handleSupabaseError(error);
    }
  }
};

// File storage API
export const storageApi = {
  async uploadFile(bucket: string, path: string, file: File) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) handleSupabaseError(error);
      return data;
    } catch (error) {
      handleSupabaseError(error);
    }
  },

  async getFileUrl(bucket: string, path: string) {
    try {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);
      
      return data.publicUrl;
    } catch (error) {
      handleSupabaseError(error);
    }
  },

  async deleteFile(bucket: string, path: string) {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);
      
      if (error) handleSupabaseError(error);
      return true;
    } catch (error) {
      handleSupabaseError(error);
    }
  },

  async listFiles(bucket: string, folder?: string) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(folder);
      
      if (error) handleSupabaseError(error);
      return data;
    } catch (error) {
      handleSupabaseError(error);
    }
  }
};

// Real-time subscriptions
export const subscriptionsApi = {
  subscribeToTable<T extends keyof Tables>(
    table: T,
    callback: (payload: any) => void,
    filter?: string
  ) {
    const channel = supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: table,
          filter: filter
        },
        callback
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  subscribeToUserNotifications(userId: string, callback: (payload: any) => void) {
    return this.subscribeToTable(
      'notifications',
      callback,
      `user_id=eq.${userId}`
    );
  },

  subscribeToProjectUpdates(projectId: string, callback: (payload: any) => void) {
    return this.subscribeToTable(
      'projects',
      callback,
      `id=eq.${projectId}`
    );
  }
};

export default {
  profiles: profilesApi,
  organizations: organizationsApi,
  userOrganizations: userOrganizationsApi,
  projects: projectsApi,
  tasks: tasksApi,
  files: filesApi,
  filePermissions: filePermissionsApi,
  clientPortals: clientPortalsApi,
  legalDocuments: legalDocumentsApi,
  financialRecords: financialRecordsApi,
  services: servicesApi,
  knowledgeArticles: knowledgeArticlesApi,
  activityLogs: activityLogsApi,
  notifications: notificationsApi,
  fileCategories: fileCategoriesApi,
  auth: authApi,
  analytics: analyticsApi,
  storage: storageApi,
  subscriptions: subscriptionsApi
};