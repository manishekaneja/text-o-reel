import { createContext } from "react";

export const UserContext = createContext<{
  user: User | null;
  isLoggedIn: boolean;
}>({
  user: null,
  isLoggedIn: false,
});
