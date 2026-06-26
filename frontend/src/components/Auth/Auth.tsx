import React, { useState, useEffect } from "react";
import "./Auth.css";
import { Toast } from "../Toast/Toast";

type AuthMode = "choice" | "login" | "register";
interface Props {
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
}
export const Auth = ({ register, login, loading, error }: Props) => {
  const [mode, setMode] = useState<AuthMode>("choice");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setMode("choice");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (mode === "choice") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === "register") await register(email, password);
      if (mode === "login") await login(email, password);
      handleClose();
    } catch {
      //stay in the selected mode
    }
  };

  return (
    <div className="auth-overlay">
      {error && <Toast message={error.message} />}
      <div className="auth-popup">
        {mode === "choice" && (
          <div className="auth-choice">
            <h2>Elian's To-Do App</h2>
            <button onClick={() => setMode("login")} className="mode-btn">
              Log In
            </button>
            <button onClick={() => setMode("register")} className="mode-btn">
              Register
            </button>
          </div>
        )}

        {(mode === "login" || mode === "register") && (
          <div className="auth">
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-header">
                <h2>{mode === "login" ? "Log In" : "Register"}</h2>
                <button type="button" onClick={() => handleClose()} autoFocus>
                  {"←"}
                </button>
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn" disabled={loading}>
                {mode === "login" ? "Log In" : "Register"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
