import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { createUserRoutes } from "./routes/user.routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Initialize dependencies
const userRepository = new UserRepository(supabase);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", createUserRoutes(userController, supabase));

// Error handling middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
