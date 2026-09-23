"use client";
import { useState } from "react";
import Image from "next/image";
import api from "../../lib/axios";
import styles from "../login.module.css";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isValidUsername = (value: string) => {
  // Letters, numbers, at underscore lang ang pinapayagan
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  return usernameRegex.test(value);
};

const isValidEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

 const handleRegister = async () => {
  setError("");
  setSuccess("");

  if (!isValidUsername(username)) {
    setError("Username can only contain letters, numbers, and underscores (no special characters or spaces)");
    return;
  }

  if (!isValidEmail(email)) {
    setError("Please enter a valid email address");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    await axios.post("http://localhost:5000/api/register", {
      username,
      email,
      password,
      role: "staff",
    });

    setSuccess("Account created! Redirecting to login...");
    setTimeout(() => router.push("/"), 1500);
  } catch (err: any) {
    setError(err.response?.data?.message || "Registration failed");
  }
};

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.card}>
          <h1 className={styles.title}>Create Account</h1>

          <div className={styles.logoBox}>
            <Image src="/logo1.png" alt="IT Inventory" width={170} height={120} />
          </div>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          {success && <p style={{ color: "lightgreen", textAlign: "center" }}>{success}</p>}

          <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button className={styles.loginBtn} type="submit">
              CREATE ACCOUNT
            </button>
          </form>

          <p className={styles.signup}>
            Already have an account? <a href="/">Log in</a>
            </p>
        </div>
      </div>
    </div>
  );
}