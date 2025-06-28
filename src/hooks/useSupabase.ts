import { useQuery, useMutation, useQueryClient } from 'react-query';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { Database } from '../lib/database.types';
import api from '../services/api';

type Tables = Database['public']['Tables'];

// Generic CRUD hooks
export function useSupabaseQuery<T extends keyof Tables>(
  table: T,
  queryKey: string[],
  options?: {
    select?: string;
    filter?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    enabled?: boolean;
  }
) {
  return useQuery({
    queryKey,
    queryFn: () => api[table].getAll(options),
    enabled: options?.enabled !== false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useSupabaseMutation<T extends keyof Tables>(
  table: T,
  operation: 'insert' | 'update' | 'delete'
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      switch (operation) {
        case 'insert':
          return await api[table].create(data);
        case 'update':
          return await api[table].update(data.id, data.updates);
        case 'delete':
          return await api[table].delete(data.id);
        default:
          throw new Error(`Unknown operation: ${operation}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([table]);
    },
    onError: (error) => {
      console.error(`${operation} operation failed:`, error);
    }
  });
}

// Authentication hooks
export const useAuth = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) handleSupabaseError(error);
      
      if (!user) return { user: null, profile: null };
      
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileError) handleSupabaseError(profileError);
      
      return { user, profile };
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useSignIn = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      api.auth.signIn(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries(['auth']);
    }
  });
};

export const useSignUp = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      email, 
      password, 
      displayName, 
      role 
    }: { 
      email: string; 
      password: string; 
      displayName: string; 
      role: string; 
    }) =>
      api.auth.signUp(email, password, { display_name: displayName, role }),
    onSuccess: () => {
      queryClient.invalidateQueries(['auth']);
    }
  });
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => api.auth.signOut(),
    onSuccess: () => {
      queryClient.clear();
    }
  });
};

// Profile hooks
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const user = await api.auth.getCurrentUser();
      if (!user) return null;
      
      return await api.profiles.getById(user.id);
    }
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (updates: Tables['profiles']['Update']) =>
      api.auth.updateProfile(updates),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
      queryClient.invalidateQueries(['auth']);
    }
  });
};

// Projects hooks
export const useProjects = (organizationId?: string) => {
  return useSupabaseQuery('projects', ['projects', organizationId], {
    filter: organizationId ? { organization_id: organizationId } : undefined,
    orderBy: { column: 'created_at', ascending: false }
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => api.projects.getById(id),
    enabled: !!id
  });
};

export const useCreateProject = () => {
  return useSupabaseMutation('projects', 'insert');
};

export const useUpdateProject = () => {
  return useSupabaseMutation('projects', 'update');
};

export const useDeleteProject = () => {
  return useSupabaseMutation('projects', 'delete');
};

// Tasks hooks
export const useTasks = (projectId?: string, assignedTo?: string) => {
  const filter: Record<string, any> = {};
  if (projectId) filter.project_id = projectId;
  if (assignedTo) filter.assigned_to = assignedTo;
  
  return useSupabaseQuery('tasks', ['tasks', projectId, assignedTo], {
    filter: Object.keys(filter).length > 0 ? filter : undefined,
    orderBy: { column: 'created_at', ascending: false }
  });
};

export const useCreateTask = () => {
  return useSupabaseMutation('tasks', 'insert');
};

export const useUpdateTask = () => {
  return useSupabaseMutation('tasks', 'update');
};

export const useDeleteTask = () => {
  return useSupabaseMutation('tasks', 'delete');
};

// Files hooks
export const useFiles = (projectId?: string, organizationId?: string) => {
  const filter: Record<string, any> = {};
  if (projectId) filter.project_id = projectId;
  if (organizationId) filter.organization_id = organizationId;
  
  return useSupabaseQuery('files', ['files', projectId, organizationId], {
    filter: Object.keys(filter).length > 0 ? filter : undefined,
    orderBy: { column: 'created_at', ascending: false }
  });
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      file, 
      bucket = 'files', 
      path,
      metadata 
    }: { 
      file: File; 
      bucket?: string; 
      path: string;
      metadata?: any;
    }) => {
      // Upload to storage
      const storageResult = await api.storage.uploadFile(bucket, path, file);
      
      // Create file record
      const fileRecord = await api.files.create({
        filename: path,
        original_filename: file.name,
        file_path: path,
        file_size_bytes: file.size,
        file_type: file.type,
        file_extension: file.name.split('.').pop() || '',
        storage_bucket: bucket,
        uploaded_by: (await api.auth.getCurrentUser())?.id || '',
        ...metadata
      });
      
      return { storageResult, fileRecord };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['files']);
    }
  });
};

// Organizations hooks
export const useOrganizations = () => {
  return useSupabaseQuery('organizations', ['organizations'], {
    orderBy: { column: 'name', ascending: true }
  });
};

export const useCreateOrganization = () => {
  return useSupabaseMutation('organizations', 'insert');
};

// Services hooks
export const useServices = () => {
  return useSupabaseQuery('services', ['services'], {
    filter: { is_active: true },
    orderBy: { column: 'name', ascending: true }
  });
};

export const useCreateService = () => {
  return useSupabaseMutation('services', 'insert');
};

// Notifications hooks
export const useNotifications = (userId?: string) => {
  return useSupabaseQuery('notifications', ['notifications', userId], {
    filter: userId ? { user_id: userId } : undefined,
    orderBy: { column: 'created_at', ascending: false }
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: string) =>
      api.notifications.update(notificationId, { is_read: true }),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    }
  });
};

// Analytics hooks
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => api.analytics.getDashboardStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useRecentActivity = (limit = 10) => {
  return useQuery({
    queryKey: ['recent-activity', limit],
    queryFn: () => api.analytics.getRecentActivity(limit),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useProjectMetrics = () => {
  return useQuery({
    queryKey: ['project-metrics'],
    queryFn: () => api.analytics.getProjectMetrics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Real-time hooks
export const useRealtimeSubscription = <T extends keyof Tables>(
  table: T,
  callback: (payload: any) => void,
  filter?: string
) => {
  const queryClient = useQueryClient();
  
  React.useEffect(() => {
    const unsubscribe = api.subscriptions.subscribeToTable(
      table,
      (payload) => {
        callback(payload);
        queryClient.invalidateQueries([table]);
      },
      filter
    );
    
    return unsubscribe;
  }, [table, filter, callback, queryClient]);
};