import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { createUserRoutes } from "./routes/user.routes";
import { supabase } from "./config/supabase";

dotenv.config();


// Initialize dependencies
const userRepository = new UserRepository(supabase);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", createUserRoutes(userController));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
