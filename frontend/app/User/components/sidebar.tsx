"use client";

import styles from "../landingpage/landing.module.css";

type Props = {
sidebarOpen: boolean;
};

export default function Sidebar({ sidebarOpen }: Props) {
return (
    <aside
    className={`${styles.sidebar} ${
        sidebarOpen ? styles.sidebarOpen : ""
    }`}
    >
        <div className={styles.logo}>
        <div className={styles.logoIcon}>📋</div>

        <div>
            <h2>IT INVENTORY</h2>
            <span>v2.4.1</span>
        </div>
        </div>

        <nav className={styles.nav}>
        <a className={`${styles.navItem} ${styles.active}`}>
            <span>▦</span>
            Dashboard
        </a>

        <a className={styles.navItem}>
            <span>📦</span>
            Inventory
        </a>

        <a className={styles.navItem}>
            <span>⇄</span>
            Transactions
        </a>

        <a className={styles.navItem}>
            <span>👥</span>
            Users
        </a>

        <a className={styles.navItem}>
            <span>📝</span>
            Logs
        </a>
        </nav>

        <div className={styles.profile}>
        <div className={styles.avatar}>RM</div>

        <div>
            <strong>Regie Morales</strong>
            <span>Administrator</span>
        </div>
        </div>
    </aside>
    );
}