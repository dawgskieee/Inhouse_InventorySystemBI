"use client";
import { useState } from "react";
import styles from "../landingpage/landing.module.css";
export default function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return(
<header className={styles.header}>
        <button
            className={styles.hamburger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
    >
            ☰
        </button>

        <input
            className={styles.search}
            placeholder="Search..."
        />

        <div className={styles.rightHeader}>
            <button className={styles.iconBtn}>🔔</button>
            <button className={styles.iconBtn}>↻</button>

            <div className={styles.user}>
            <div className={styles.userCircle}>RM</div>

            <span>Regie</span>
            </div>

            <button className={styles.dashboardBtn}>
            + Dashboard
            </button>
        </div>
        </header>
    );
}