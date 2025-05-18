import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { useAuth } from "../../context/auth-context";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login({ email, password });

      if (result.success) {
        // Redirect to home page
        navigate("/", { replace: true });
      } else if (result.error) {
        setError(result.error);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1 className={styles.title}>Login</h1>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleLogin}>
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="Email"
            required
          />

          <Input
            type="password"
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="Password"
            required
          />

          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
