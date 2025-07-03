import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { User } from "../types";

// localStorage => shared data across tabs (users)
// sessionStorage => data only for the current tab (cuurent user)

export const useAuth = () => {
  const navigate = useNavigate();

  const getUsers = (): User[] => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USERS) || "[]");
  };

  const getCurrentUser = (): string | null => {
    return sessionStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
  };

  const saveAndLogin = (username: string) => {
    sessionStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_USER, username); //saving it in sessionStorage so in each other tab, there will be a diff user
    navigate("/chat-rooms");
  };

  const login = (username: string, password: string): string | null => {
    const users = getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) return "Invalid username or password";
    saveAndLogin(username);
    return null;
  };

  const register = (username: string, password: string): string | null => {
    const users = getUsers();
    const exists = users.some((u) => u.username === username);
    if (exists) return "Username already taken";

    const newUser = { username, password };
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.USERS,
      JSON.stringify([...users, newUser])
    );
    saveAndLogin(username);
    return null;
  };

  const logout = () => {
    sessionStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
    navigate("/");
  };

  return {
    login,
    register,
    getCurrentUser,
    logout,
  };
};
