export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserDTO {
  email: string;
  full_name: string;
}

export interface UpdateUserDTO {
  email?: string;
  full_name?: string;
} 