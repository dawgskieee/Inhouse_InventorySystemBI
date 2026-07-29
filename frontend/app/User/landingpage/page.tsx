"use client";

import { useState } from "react";
import styles from "./landing.module.css";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Cards from "../components/cards";
export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Sidebar />


      {}

      <div
        className={`${styles.content} ${
          open ? styles.contentFull : ""
        }`}
      >
        {}

        <Navbar />
      </div>
    

        {/* BODY */}

        <main className={styles.main}>
          <div className={styles.breadcrumb}>
            Home / Dashboard
          </div>

          <h1 className={styles.title}>DASHBOARD</h1>

          {/* ================= CARDS ================= */}

          <Cards />

          {/* ================= CHARTS ================= */}

          <div className={styles.chartSection}>
            <div className={styles.chart}>
              <h2>Stock Level Trend</h2>

              <p style={{ color: "#7d8dab", marginTop: 5 }}>
                Total units across all categories
              </p>

              <div
                style={{
                  height: 230,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#a0aec0",
                  fontSize: 18,
                }}
              >
                📈 Chart Area
              </div>
            </div>

            <div className={styles.chart}>
              <h2>Units by Category</h2>

              <p style={{ color: "#7d8dab", marginTop: 5 }}>
                Current stock distribution
              </p>

              <div
                style={{
                  height: 230,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#a0aec0",
                  fontSize: 18,
                }}
              >
                📊 Bar Chart
              </div>
            </div>
          </div>

          {/* ================= TABLE ================= */}

          <div className={styles.tableCard}>
            <div className={styles.tableTitle}>
              <h2>Recent Items</h2>

              <a href="#">View all</a>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Updated</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>EL-4820-A</td>
                  <td>Intel Core i7-12700K</td>
                  <td>Electronics</td>
                  <td>47</td>
                  <td>
                    <span className={styles.badge}>
                      In Stock
                    </span>
                  </td>
                  <td>2026-07-28</td>
                </tr>

                <tr>
                  <td>EL-3310-B</td>
                  <td>Samsung 32GB DDR5 RAM</td>
                  <td>Electronics</td>
                  <td>8</td>
                  <td>
                    <span
                      className={`${styles.badge} ${styles.low}`}
                    >
                      Low Stock
                    </span>
                  </td>
                  <td>2026-07-27</td>
                </tr>

                <tr>
                  <td>HW-4400</td>
                  <td>Wireless Mouse</td>
                  <td>Hardware</td>
                  <td>0</td>
                  <td>
                    <span
                      className={`${styles.badge} ${styles.out}`}
                    >
                      Out of Stock
                    </span>
                  </td>
                  <td>2026-07-25</td>
                </tr>

                <tr>
                  <td>PK-001</td>
                  <td>Packaging Tape</td>
                  <td>Packaging</td>
                  <td>150</td>
                  <td>
                    <span className={styles.badge}>
                      In Stock
                    </span>
                  </td>
                  <td>2026-07-21</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
  );
}