"use client";
import { useState } from "react";
import styles from "../landingpage/landing.module.css";
type Props = {
sidebarOpen: boolean;
setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
currentPage: string;
setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
};

export default function Sidebar({
sidebarOpen,
currentPage,
setCurrentPage,
}: Props) {
    const [inventoryOpen, setInventoryOpen] = useState(false);
return (
    <aside
    className={`${styles.sidebar} ${
        sidebarOpen ? styles.sidebarOpen :  styles.sidebarClose
    }`}
    >
        <div className={styles.logo}>
        <div className={styles.logoIcon}>📋</div>

        <div>
            <h2>IT INVENTORY</h2>
            <span>Beyond Innovations</span>
        </div>
        </div>

        <nav className={styles.nav}>
        <div
        className={`${styles.navItem} ${
            currentPage === "dashboard" ? styles.active : ""
        }`}
        onClick={() => setCurrentPage("dashboard")}
        ><span>▦</span>Dashboard
            </div>

        <div className={styles.menuGroup}>
            <div className={styles.menuRow}>

    {/* Inventory */}
    <div
    className={`${styles.navItem} ${
        currentPage === "inventory" ? styles.active : ""
    }`}
    onClick={() => setCurrentPage("inventory")}
    >
    <span>📦</span>
    Inventory
    </div>

    {/* Dropdown */}
    <button
    type="button"
    className={styles.dropdownBtn}
    onClick={() => setInventoryOpen(!inventoryOpen)}
    >
    {inventoryOpen ? "▲" : "▼"}
    </button>

</div>

{inventoryOpen && (

    <div className={styles.subMenu}>

    <div
        className={`${styles.subMenuItem} ${
        currentPage === "headOffice" ? styles.active : ""
        }`}
        onClick={() => setCurrentPage("headOffice")}
    >
        Head Office
</div>

    <div
        className={`${styles.subMenuItem} ${
        currentPage === "store" ? styles.active : ""
        }`}
        onClick={() => setCurrentPage("store")}
    >
        Store Inventory
    </div>

    </div>

)}

</div>

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