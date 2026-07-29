import { useState } from "react";
import styles from "../landingpage/landing.module.css";
export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        
        <nav className={styles.navbar}>
    <div className={styles.leftNav}>
            <div
            onClick={() => setOpen(!open)}
            className={`${styles.hamburger} ${
                open ? styles.open : ""
            }`}
            >
            <span></span>
            </div>

            <div style={{ position: "relative" }}>
            <span
            style={{
                position: "absolute",
                left: 12,
                top: 10,
                color: "white",
                fontSize: 18,
                }}
                >🔍
                </span>

            <input
                className={styles.search}
                placeholder="Search..."
                style={{ paddingLeft: 38 }}
            />
            </div>
        </div>

        <div className={styles.rightNav}>
            <span style={{ fontSize: 20 }}>🔔</span>

            <span style={{ fontSize: 20 }}>🔄</span>

            <div className={styles.userCircle}>RM</div>

            <strong>Regie</strong>

            <button className={styles.dashboardBtn}>
            +
            &nbsp; Dashboard
            </button>
        </div>
        </nav>
);
}