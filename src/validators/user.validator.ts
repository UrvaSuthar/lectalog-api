import { z } from 'zod';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
});

export const updateUserSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  full_name: z.string().min(2, 'Full name must be at least 2 characters').optional(),
});

export const validateUser = (schema: z.ZodSchema): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}; 