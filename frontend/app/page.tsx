import Image from "next/image";
import styles from "./login.module.css";

export default function LoginPage() {
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

          <form>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username/Email</label>
              <input
                id="username"
                type="text"
                placeholder="Enter username or email"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
              />
            </div>

            <button type="submit" className={styles.loginBtn}>
              LOG IN
            </button>
          </form>

          <p className={styles.signup}>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}