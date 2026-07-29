import { useState } from "react";
import styles from "../landingpage/landing.module.css";
export default function Cards() {
    const [open, setOpen] = useState(false);
    return (
<div className={styles.cards}>

<div className={styles.card}>
    <div className={styles.cardLabel}>TOTAL ITEMS</div>
    <div className={styles.cardValue}>12</div>
    <div className={styles.cardFooter}>+3 added this week</div>

    <div
    style={{
        float: "right",
        marginTop: -85,
        fontSize: 38,
    }}
    >
    💻
    </div>
</div>

<div className={styles.card}>
    <div className={styles.cardLabel}>LOW STOCK</div>
    <div className={styles.cardValue}>4</div>
    <div className={styles.cardFooter}>4 SKUs below threshold</div>

    <div
    style={{
        float: "right",
        marginTop: -85,
        fontSize: 38,
    }}
    >
    ⚠️
    </div>
</div>

<div className={styles.card}>
    <div className={styles.cardLabel}>OUT OF STOCK</div>
    <div className={styles.cardValue}>1</div>
    <div className={styles.cardFooter}>Requires restock</div>

    <div
    style={{
        float: "right",
        marginTop: -85,
        fontSize: 38,
    }}
    >
    ❌
    </div>
</div>

<div className={styles.card}>
    <div className={styles.cardLabel}>TOTAL VALUE</div>
    <div className={styles.cardValue}>$27.9K</div>
    <div className={styles.cardFooter}>+$2.1K vs last week</div>

    <div
    style={{
        float: "right",
        marginTop: -85,
        fontSize: 38,
    }}
    >
    💰
    </div>
</div>

</div>
    );
}