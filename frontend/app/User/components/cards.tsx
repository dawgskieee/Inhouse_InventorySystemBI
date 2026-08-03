"use client";

import styles from "../landingpage/landing.module.css";

export default function Cards() {
  return (
    <div className={styles.cards}>

      {/* TOTAL ITEMS */}
      <div className={styles.card}>
        <div>
          <small>TOTAL ITEMS</small>
          <h2>12</h2>
          <p>↗ +3 added this week</p>
        </div>

        <div className={styles.cardIcon}>
          📚
        </div>
      </div>

      {/* LOW STOCK */}
      <div className={styles.card}>
        <div>
          <small>LOW STOCK</small>
          <h2>4</h2>
          <p>4 SKUs below threshold</p>
        </div>

        <div className={styles.orange}>
          ⚠️
        </div>
      </div>

      {/* OUT OF STOCK */}
      <div className={styles.card}>
        <div>
          <small>OUT OF STOCK</small>
          <h2>1</h2>
          <p>Requires immediate restock</p>
        </div>

        <div className={styles.red}>
          ✕
        </div>
      </div>

      {/* TOTAL VALUE */}
      <div className={styles.card}>
        <div>
          <small>TOTAL VALUE</small>
          <h2>$27.9K</h2>
          <p>+$2.1K vs last week</p>
        </div>

        <div className={styles.green}>
          $
        </div>
      </div>

    </div>
  );
}