import { useEffect, useState } from "react";
import type { User } from "../types/Auth";
import { registerService, loginService } from "../services/authService";
const API_URL = import.meta.env.VITE_API_URL;
export interface useAuthReturn {
  user: User | null;
  error: Error | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  //logout: () => void; coming soon
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Invalid token");
        }

        const user = await res.json();

        setUser(user);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (email: string, password: string) => {
    setError(null);
    try {
      setLoading(true);
      await registerService(email, password);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      setLoading(true);
      const data = await loginService(email, password);
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (err) {
      if (err instanceof Error) {
        setError(Error(err.message));
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return { user, error, loading, register, login, logout };
};
