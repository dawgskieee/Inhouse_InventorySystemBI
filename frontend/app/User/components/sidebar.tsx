import { useState } from "react";
import styles from "../landingpage/landing.module.css";
export default function Sidebar() {
    const [open, setOpen] = useState(false);
    return (
    <aside
        className={`${styles.sidebar} ${
open ? styles.showSidebar : styles.sidebarClosed
        }`}
>
        <div className={styles.logo}>
    IT INVENTORY
        <span className={styles.version}>v2.4.1</span>
        </div>

        <div className={styles.menu}>
        <div className={`${styles.menuItem} ${styles.active}`}>
            <span>📊</span>
            Dashboard
        </div>

        <div className={styles.menuItem}>
            <span>📦</span>
            Inventory
        </div>

        <div className={styles.menuItem}>
            <span>🔄</span>
            Transactions
        </div>

        <div className={styles.menuItem}>
            <span>👥</span>
            Users
        </div>

        <div className={styles.menuItem}>
            <span>📄</span>
            Logs
        </div>
        </div>

        <div className={styles.bottomUser}>
        <div className={styles.avatar}>RM</div>

        <div>
            <strong>Regie Morales</strong>
            <br />
            <small>Administrator</small>
        </div>
        </div>
</aside>
);
}