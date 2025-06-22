import { supabase } from '../lib/supabase';
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
    let query = supabase.from(this.tableName).select(options?.select || '*');
    
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
  }

  async getById(id: string, select?: string) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select(select || '*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async create(data: Tables[T]['Insert']) {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  }

  async update(id: string, updates: Tables[T]['Update']) {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
}

// Specific service instances
export const clientsApi = new ApiService('clients');
export const projectsApi = new ApiService('projects');
export const servicesApi = new ApiService('services');
export const invoicesApi = new ApiService('invoices');
export const tasksApi = new ApiService('tasks');

// Custom API methods for complex operations
export const analyticsApi = {
  async getKPIs() {
    const { data, error } = await supabase
      .from('analytics_kpis')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getRevenueByMonth() {
    const { data, error } = await supabase
      .from('invoices')
      .select('amount, paid_date')
      .eq('status', 'paid')
      .not('paid_date', 'is', null);
    
    if (error) throw error;
    
    // Group by month
    const revenueByMonth = data.reduce((acc, invoice) => {
      const month = new Date(invoice.paid_date!).toISOString().slice(0, 7);
      acc[month] = (acc[month] || 0) + invoice.amount;
      return acc;
    }, {} as Record<string, number>);
    
    return revenueByMonth;
  },

  async getClientMetrics() {
    const { data: clients, error: clientsError } = await supabase
      .from('clients')
      .select(`
        id,
        name,
        company,
        value,
        status,
        projects (
          id,
          budget,
          spent,
          status
        ),
        invoices (
          id,
          amount,
          status
        )
      `);
    
    if (clientsError) throw clientsError;
    
    return clients.map(client => ({
      ...client,
      totalRevenue: client.invoices
        .filter(inv => inv.status === 'paid')
        .reduce((sum, inv) => sum + inv.amount, 0),
      activeProjects: client.projects.filter(p => p.status === 'in-progress').length,
      totalProjects: client.projects.length
    }));
  }
};

export const dashboardApi = {
  async getOverviewStats() {
    const [clients, projects, invoices, tasks] = await Promise.all([
      clientsApi.getAll({ filter: { status: 'active' } }),
      projectsApi.getAll({ filter: { status: 'in-progress' } }),
      invoicesApi.getAll({ filter: { status: 'sent' } }),
      tasksApi.getAll({ filter: { status: 'in-progress' } })
    ]);

    const totalRevenue = await supabase
      .from('invoices')
      .select('amount')
      .eq('status', 'paid');

    return {
      activeClients: clients?.length || 0,
      activeProjects: projects?.length || 0,
      pendingInvoices: invoices?.length || 0,
      activeTasks: tasks?.length || 0,
      totalRevenue: totalRevenue.data?.reduce((sum, inv) => sum + inv.amount, 0) || 0
    };
  }
};

// File upload service
export const storageApi = {
  async uploadFile(bucket: string, path: string, file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);
    
    if (error) throw error;
    return data;
  },

  async getFileUrl(bucket: string, path: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return data.publicUrl;
  },

  async deleteFile(bucket: string, path: string) {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) throw error;
    return true;
  }
};