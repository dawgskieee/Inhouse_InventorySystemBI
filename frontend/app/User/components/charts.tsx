"use client";
import { useState } from "react";
import styles from "../landingpage/landing.module.css";
export default function Charts() {
    const [open, setOpen] = useState(false);
    return (
<div className={styles.chartGrid}>
            <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
                <div>
                <h3>Stock Level Trend</h3>
                <p>Total units across all categories</p>
                </div>

                <button>6M</button>
            </div>

            <div className={styles.fakeChart}>
                <svg
                viewBox="0 0 700 250"
                preserveAspectRatio="none"
                >
                <polyline
                    fill="none"
                    stroke="#3f7cff"
                    strokeWidth="4"
                    points="
                    20,110
                    120,120
                    230,90
                    350,125
                    470,100
                    620,70
                "
                />

                <circle cx="20" cy="110" r="6" fill="#3f7cff" />
                <circle cx="120" cy="120" r="6" fill="#3f7cff" />
                <circle cx="230" cy="90" r="6" fill="#3f7cff" />
                <circle cx="350" cy="125" r="6" fill="#3f7cff" />
                <circle cx="470" cy="100" r="6" fill="#3f7cff" />
                <circle cx="620" cy="70" r="6" fill="#3f7cff" />
                </svg>
            </div>
            </div>

            <div className={styles.chartCard}>
            <h3>Units by Category</h3>

            <p>Current stock distribution</p>

            <div className={styles.bars}>
                <div>
                <span
                    style={{ height: "180px" }}
                    className={styles.blue}
                ></span>

                <small>Electronics</small>
                </div>

                <div>
                <span
                    style={{ height: "120px" }}
                    className={styles.greenBar}
                ></span>

                <small>Hardware</small>
                </div>

                <div>
                <span
                style={{ height: "18px" }}
                    className={styles.orange}
                ></span>

                <small>Packaging</small>
                </div>

                <div>
                <span
                    style={{ height: "12px" }}
                    className={styles.purple}
                ></span>

                <small>Tools</small>
                </div>
            </div>
            </div>
        </div>
    );
}
