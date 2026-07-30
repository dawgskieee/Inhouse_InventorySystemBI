"use client";
import { useState } from "react";
import styles from "../landingpage/landing.module.css";
export default function Overlay() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
return(

    <div className={styles.container}>
    {}
    <div
        className={`${styles.overlay} ${
        sidebarOpen ? styles.overlayShow : ""
        }`}
        onClick={() => setSidebarOpen(false)}
    />
    </div>
);
}