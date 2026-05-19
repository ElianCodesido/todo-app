import { useState } from "react";
import type { Auth } from "../types/Auth";
import { registerService, loginService } from "../services/authService";

export interface useAuthReturn {
  user: Auth | null;
  error: Error | null;
  loading: boolean;
  register: () => void;
  login: () => void;
  //logout: () => void; coming soon
}

export const useAuth = () => {
  const [user, setUser] = useState<Auth | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      const data = await registerService(email, password);
      setUser(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(Error(err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const data = await loginService(email, password);
      setUser(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(Error(err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  return { user, error, loading, register, login };
};
