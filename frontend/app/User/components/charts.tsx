"use client";
import { useState, useEffect } from "react";
import api from "../../../lib/axios";
import styles from "../landingpage/landing.module.css";

type Item = {
  category: string;
  stock: number;
};

type CategoryTotal = {
  category: string;
  totalStock: number;
};

export default function Charts() {
  const [categoryData, setCategoryData] = useState<CategoryTotal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/items");
        const items: Item[] = response.data;

        // I-group ang items base sa category, i-sum ang stock ng bawat isa
        const grouped: Record<string, number> = {};
        items.forEach((item) => {
          const cat = item.category || "Uncategorized";
          grouped[cat] = (grouped[cat] || 0) + item.stock;
        });

        const result: CategoryTotal[] = Object.entries(grouped).map(
          ([category, totalStock]) => ({ category, totalStock })
        );

        setCategoryData(result);
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Kunin ang pinakamataas na stock, gagamitin bilang batayan ng taas ng bars
  const maxStock = Math.max(...categoryData.map((c) => c.totalStock), 1);
  const barColors = [styles.blue, styles.greenBar, styles.orange, styles.purple];

  return (
    <div className={styles.chartGrid}>
      <div className={styles.chartCard}>
        <div className={styles.chartHeader}>
          <div>
            <h3>Stock Level Trend</h3>
            <p>Total units across all categories</p>
          </div>
        </div>

        <div className={styles.fakeChart}>
          <svg viewBox="0 0 700 250" preserveAspectRatio="none">
            {categoryData.length > 0 && (() => {
              // Kwentahin ang mga puntos base sa totoong data
              const points = categoryData.map((c, i) => {
                const x = (700 / Math.max(categoryData.length - 1, 1)) * i;
                const y = 220 - (c.totalStock / maxStock) * 180;
                return { x, y };
              });
              const pointsStr = points.map((p) => `${p.x},${p.y}`).join(" ");

              return (
                <>
                  <polyline
                    fill="none"
                    stroke="#3f7cff"
                    strokeWidth="4"
                    points={pointsStr}
                  />
                  {points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="6" fill="#3f7cff" />
                  ))}
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      <div className={styles.chartCard}>
        <h3>Units by Category</h3>
        <p>Current stock distribution</p>

        {loading ? (
          <p style={{ padding: "20px" }}>Loading...</p>
        ) : (
          <div className={styles.bars}>
            {categoryData.map((cat, i) => (
              <div key={cat.category}>
                <span
                  style={{ height: `${(cat.totalStock / maxStock) * 200}px` }}
                  className={barColors[i % barColors.length]}
                ></span>
                <small>{cat.category}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}