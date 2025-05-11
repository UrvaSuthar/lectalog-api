import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { SupabaseClient } from '@supabase/supabase-js';

export const authMiddleware = (supabase: SupabaseClient) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader?.startsWith('Bearer ')) {
        throw new AppError(401, 'No token provided');
      }

      const token = authHeader.split(' ')[1];
      
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error || !user) {
        throw new AppError(401, 'Invalid token');
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
}; 