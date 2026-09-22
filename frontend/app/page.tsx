"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/User/landingpage"); // may session na, diretso sa dashboard
    } else {
      setCheckingSession(false); // walang session, ipakita ang login form
    }
  }, []);

  const handleLogin = async () => {
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/User/landingpage");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  if (checkingSession) {
    return <p style={{ padding: "40px", textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.card}>
          <h1 className={styles.title}>Login</h1>

          <div className={styles.logoBox}>
            <Image
              src="/logo1.png"
              alt="IT Inventory"
              width={170}
              height={120}
            />
          </div>

          {error && (
            <p style={{ color: "red", textAlign: "center", marginBottom: "12px" }}>
              {error}
            </p>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username/Email</label>
              <input
                id="username"
                type="text"
                placeholder="Enter username or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className={styles.loginBtn} type="submit">
              LOG IN
            </button>
          </form>

          <p className={styles.signup}>
            Don&apos;t have an account? <a href="/register">Sign up</a>
          </p>

        </div>
      </div>
    </div>
  );
}