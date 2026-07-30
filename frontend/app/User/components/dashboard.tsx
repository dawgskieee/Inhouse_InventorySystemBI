"use client";
import { useState } from "react";
import styles from "../landingpage/landing.module.css";
export default function Page() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
return(
<section className={styles.page}>
        <p className={styles.breadcrumb}>
            Home / Dashboard
        </p>

        <h1>DASHBOARD</h1>
        </section>
);
}
