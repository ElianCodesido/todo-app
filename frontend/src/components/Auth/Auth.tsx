import React, { useState } from "react";
import "./Auth.css";

type AuthMode = "choice" | "login" | "register";
interface Props {
  register: (email: string, password: string) => void;
  login: (email: string, password: string) => void;
}
export const Auth = ({ register, login }: Props) => {
  const [mode, setMode] = useState<AuthMode>("choice");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setMode("choice");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register") {
      register(email, password);
    }
    if (mode === "login") {
      login(email, password);
    }

    handleClose();
  };

  return (
    <div className="auth-overlay">
      <div className="auth-popup">
        {mode === "choice" && (
          <div className="auth-choice">
            <h2>Welcome</h2>
            <button onClick={() => setMode("login")} className="mode-btn">
              Log In
            </button>
            <button onClick={() => setMode("register")} className="mode-btn">
              Register
            </button>
          </div>
        )}

        {(mode === "login" || mode === "register") && (
          <form onSubmit={handleSubmit} className="auth-form">
            <h2>{mode === "login" ? "Log In" : "Register"}</h2>
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
            <button type="submit" className="submit-btn">
              {mode === "login" ? "Log In" : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
