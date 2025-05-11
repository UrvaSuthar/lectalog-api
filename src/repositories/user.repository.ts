import { SupabaseClient } from '@supabase/supabase-js';
import { User, CreateUserDTO, UpdateUserDTO } from '../models/user.model';

export class UserRepository {
  private readonly TABLE_NAME = 'users';

  constructor(private readonly supabase: SupabaseClient) {}

  async create(userData: CreateUserDTO): Promise<User> {
    const { data, error } = await this.supabase
      .from(this.TABLE_NAME)
      .insert([userData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async findById(id: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE_NAME)
      .select()
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from(this.TABLE_NAME)
      .select()
      .eq('email', email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  async findAll(): Promise<User[]> {
    const { data, error } = await this.supabase
      .from(this.TABLE_NAME)
      .select();

    if (error) throw error;
    return data;
  }

  async update(id: string, userData: UpdateUserDTO): Promise<User> {
    const { data, error } = await this.supabase
      .from(this.TABLE_NAME)
      .update(userData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.TABLE_NAME)
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
} 