import { useState } from "react";
import styles from "../landingpage/landing.module.css";
export default function Body() {
    const [open, setOpen] = useState(false);
    return (
    <main className={styles.main}>
        <div className={styles.breadcrumb}>
            Home / Dashboard
        </div>

        <h1 className={styles.title}>DASHBOARD</h1>
        </main>
);
}