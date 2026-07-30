"use client";

import styles from "../landingpage/landing.module.css";

type Props = {
sidebarOpen: boolean;
setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({
sidebarOpen,
setSidebarOpen,
}: Props) {
return (
    <nav className={styles.navbar}>
    <div className={styles.leftNav}>
        <button
        className={styles.hamburger}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        >
        ☰
        </button>

        <div style={{ position: "relative" }}>
        <span
            style={{
            position: "absolute",
            left: 12,
            top: 11,
            color: "#64748b",
            fontSize: 18,
            }}
        >
            🔍
        </span>

        <input
            className={styles.search}
            placeholder="Search..."
            style={{ paddingLeft: 40 }}
        />
        </div>
    </div>

    <div className={styles.rightNav}>
        <button className={styles.iconBtn}>🔔</button>

        <button className={styles.iconBtn}>↻</button>

        <div className={styles.userCircle}>RM</div>

        <strong>Regie</strong>

        <button className={styles.dashboardBtn}>
        + Dashboard
        </button>
    </div>
    </nav>
);
}