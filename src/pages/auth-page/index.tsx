import { useState } from "react";
import { useAuth } from "../../hooks";
import styles from "./style.module.css";

export const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, register } = useAuth();

  const toggleMode = () => {
    setError("");
    setUsername("");
    setPassword("");
    setIsLoginMode((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    const errorMessage = isLoginMode
      ? login(username, password)
      : register(username, password);

    if (errorMessage) {
      setError(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>{isLoginMode ? "Login" : "Register"}</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit">{isLoginMode ? "Login" : "Register"}</button>

        <p className={styles.toggle} onClick={toggleMode}>
          {isLoginMode
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};
