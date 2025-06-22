import { useQuery, useMutation, useQueryClient } from 'react-query';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

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
  }
) {
  return useQuery(queryKey, async () => {
    let query = supabase.from(table).select(options?.select || '*');
    
    if (options?.filter) {
      Object.entries(options.filter).forEach(([key, value]) => {
        query = query.eq(key, value);
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
    if (error) throw error;
    return data;
  });
}

export function useSupabaseMutation<T extends keyof Tables>(
  table: T,
  operation: 'insert' | 'update' | 'delete'
) {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (data: any) => {
      let query;
      
      switch (operation) {
        case 'insert':
          query = supabase.from(table).insert(data).select();
          break;
        case 'update':
          query = supabase.from(table).update(data.updates).eq('id', data.id).select();
          break;
        case 'delete':
          query = supabase.from(table).delete().eq('id', data.id);
          break;
      }
      
      const { data: result, error } = await query;
      if (error) throw error;
      return result;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([table]);
      }
    }
  );
}

// Specific hooks for each entity
export const useClients = () => {
  return useSupabaseQuery('clients', ['clients'], {
    orderBy: { column: 'created_at', ascending: false }
  });
};

export const useCreateClient = () => {
  return useSupabaseMutation('clients', 'insert');
};

export const useUpdateClient = () => {
  return useSupabaseMutation('clients', 'update');
};

export const useDeleteClient = () => {
  return useSupabaseMutation('clients', 'delete');
};

export const useProjects = (clientId?: string) => {
  return useSupabaseQuery('projects', ['projects', clientId], {
    filter: clientId ? { client_id: clientId } : undefined,
    orderBy: { column: 'created_at', ascending: false }
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

export const useServices = () => {
  return useSupabaseQuery('services', ['services'], {
    orderBy: { column: 'name', ascending: true }
  });
};

export const useCreateService = () => {
  return useSupabaseMutation('services', 'insert');
};

export const useUpdateService = () => {
  return useSupabaseMutation('services', 'update');
};

export const useDeleteService = () => {
  return useSupabaseMutation('services', 'delete');
};

export const useInvoices = (clientId?: string) => {
  return useSupabaseQuery('invoices', ['invoices', clientId], {
    filter: clientId ? { client_id: clientId } : undefined,
    orderBy: { column: 'created_at', ascending: false }
  });
};

export const useCreateInvoice = () => {
  return useSupabaseMutation('invoices', 'insert');
};

export const useUpdateInvoice = () => {
  return useSupabaseMutation('invoices', 'update');
};

export const useDeleteInvoice = () => {
  return useSupabaseMutation('invoices', 'delete');
};

export const useTasks = (assignedTo?: string) => {
  return useSupabaseQuery('tasks', ['tasks', assignedTo], {
    filter: assignedTo ? { assigned_to: assignedTo } : undefined,
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

// Authentication hooks
export const useProfile = () => {
  return useQuery(['profile'], async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) throw error;
    return data;
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    async (updates: Partial<Tables['profiles']['Update']>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profile']);
      }
    }
  );
};