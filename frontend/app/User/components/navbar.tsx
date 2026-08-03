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
            placeholder="Search name,asset or serial number"
            style={{ paddingLeft: 40 }}
        />
        </div>
    </div>
    <div className={styles.rightNav}>
        <button className={styles.exportBtn}>
    ⬇ Export to Excel
    </button>
    <button className={styles.newAssetBtn}>
        + New Asset
        </button>
        <div className={styles.userMenu}>
            <button className={styles.userButton}>
                Regie ▾
                </button>
                </div>
                </div>
                </nav>
);
}