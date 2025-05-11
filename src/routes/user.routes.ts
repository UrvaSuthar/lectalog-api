import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export function createUserRoutes(userController: UserController): Router {
  const router = Router();

  // Create a new user
  router.post('/', (req, res) => userController.createUser(req, res));

  // Get all users
  router.get('/', (req, res) => userController.getAllUsers(req, res));

  // Get user by ID
  router.get('/:id', (req, res) => userController.getUserById(req, res));

  // Update user
  router.put('/:id', (req, res) => userController.updateUser(req, res));

  // Delete user
  router.delete('/:id', (req, res) => userController.deleteUser(req, res));

  return router;
} 