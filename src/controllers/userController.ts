import { Request, Response } from "express";
import { fetchAllUsers } from "../services/userService";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await fetchAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
