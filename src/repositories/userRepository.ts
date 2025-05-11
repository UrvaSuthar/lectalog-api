import { supabase } from "../config/supabase";
import { User } from "../models/User";

export const getUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data as User[];
};
