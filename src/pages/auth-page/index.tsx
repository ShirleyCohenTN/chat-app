import { useState } from "react";
import { useAuth } from "../../hooks";
import { LogoIcon } from "../../assets";
import styles from "./style.module.css";

export const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isFormInvalid = !username.trim() || !password.trim();

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
        <div className={styles.logoWrapper}>
          <LogoIcon />
        </div>

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

        <button type="submit" disabled={isFormInvalid}>
          {isLoginMode ? "Login" : "Register"}
        </button>

        <p className={styles.toggle}>
          {isLoginMode ? (
            <>
              <span className={styles.text}>Don't have an account? </span>
              <span onClick={toggleMode} className={styles.link}>
                Register
              </span>
            </>
          ) : (
            <>
              <span className={styles.text}>Already have an account? </span>
              <span onClick={toggleMode} className={styles.link}>
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};
