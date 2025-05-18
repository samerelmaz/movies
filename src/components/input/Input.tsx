import { useState } from "react";
import type { ChangeEvent } from "react";
import styles from "./Input.module.css";
import { isValidEmail, isValidPassword } from "../../utils/auth";

interface InputProps {
  type: "text" | "email" | "password";
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export default function Input({
  type,
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
}: InputProps) {
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // Validation
    if (type === "email") {
      setError(
        newValue && !isValidEmail(newValue)
          ? "Please enter a valid email address"
          : ""
      );
    } else if (type === "password") {
      setError(
        newValue && !isValidPassword(newValue)
          ? "Password must be at least 6 characters long"
          : ""
      );
    }
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.inputError : ""} ${
          focused ? styles.focused : ""
        }`}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
      {type === "password" && !error && (
        <p className={styles.hint}>
          Password must be at least 6 characters long
        </p>
      )}
    </div>
  );
}
