"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../landingpage/landing.module.css";

type Item = {
  id: number;
  stock: number;
  status: string;
};

export default function Cards() {
  const [totalItems, setTotalItems] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, assetsRes] = await Promise.all([
          axios.get("http://localhost:5000/items"),
          axios.get("http://localhost:5000/assets"),
        ]);

        const items: Item[] = itemsRes.data;

        setTotalItems(items.length);
        setLowStock(items.filter((i) => i.status === "Low Stock").length);
        setOutOfStock(items.filter((i) => i.status === "Out of Stock").length);
        setTotalAssets(assetsRes.data.length);
      } catch (err) {
        console.error("Failed to fetch dashboard cards data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.cards}><p style={{ padding: "20px" }}>Loading...</p></div>;
  }

  return (
    <div className={styles.cards}>

      {/* TOTAL ITEMS */}
      <div className={styles.card}>
        <div>
          <small>TOTAL ITEMS</small>
          <h2>{totalItems}</h2>
          <p>Across all categories</p>
        </div>

        <div className={styles.cardIcon}>
          📚
        </div>
      </div>

      {/* LOW STOCK */}
      <div className={styles.card}>
        <div>
          <small>LOW STOCK</small>
          <h2>{lowStock}</h2>
          <p>{lowStock} SKUs below threshold</p>
        </div>

        <div className={styles.orange}>
          ⚠️
        </div>
      </div>

      {/* OUT OF STOCK */}
      <div className={styles.card}>
        <div>
          <small>OUT OF STOCK</small>
          <h2>{outOfStock}</h2>
          <p>Requires immediate restock</p>
        </div>

        <div className={styles.red}>
          ✕
        </div>
      </div>

      {/* TOTAL ASSETS */}
      <div className={styles.card}>
        <div>
          <small>TOTAL ASSETS</small>
          <h2>{totalAssets}</h2>
          <p>Head Office + Store devices</p>
        </div>

        <div className={styles.green}>
          🖥️
        </div>
      </div>

    </div>
  );
}