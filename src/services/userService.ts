import { getUsers } from "../repositories/userRepository";

export const fetchAllUsers = async () => {
  return await getUsers();
};
