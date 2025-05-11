import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateUser } from '../validators/user.validator';
import { createUserSchema, updateUserSchema } from '../validators/user.validator';
import { authMiddleware } from '../middleware/auth.middleware';
import { SupabaseClient } from '@supabase/supabase-js';

export function createUserRoutes(
  userController: UserController,
  supabase: SupabaseClient
): Router {
  const router = Router();
  const auth = authMiddleware(supabase);

  // Public routes
  router.post(
    '/',
    validateUser(createUserSchema),
    (req, res) => userController.createUser(req, res)
  );

  // Protected routes
  router.use(auth); // Apply auth middleware to all routes below

  router.get('/', (req, res) => userController.getAllUsers(req, res));
  router.get('/:id', (req, res) => userController.getUserById(req, res));
  router.put(
    '/:id',
    validateUser(updateUserSchema),
    (req, res) => userController.updateUser(req, res)
  );
  router.delete('/:id', (req, res) => userController.deleteUser(req, res));

  return router;
} 