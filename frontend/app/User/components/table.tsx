"use client";
import { useState } from "react";
import styles from "../landingpage/landing.module.css";
export default function Table() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const recentItems = [
    {
    sku: "EL-4820-A",
    name: "Intel Core i7-12700K Processor",
    category: "Electronics",
    stock: 47,
    status: "In Stock",
    updated: "2026-07-28",
    },
    {
    sku: "EL-3310-B",
    name: "Samsung 32GB DDR5 RAM Module",
    category: "Electronics",
    stock: 8,
    status: "Low Stock",
    updated: "2026-07-27",
    },
    {
    sku: "HW-1112-C",
    name: "Mechanical Keyboard",
    category: "Hardware",
    stock: 31,
    status: "In Stock",
    updated: "2026-07-26",
    },
    {
    sku: "HW-2901-D",
    name: "Gaming Mouse",
    category: "Hardware",
    stock: 3,
    status: "Low Stock",
    updated: "2026-07-25",
    },
    {
    sku: "PK-1090-A",
    name: "Packaging Tape",
    category: "Packaging",
    stock: 91,
    status: "In Stock",
    updated: "2026-07-24",
    },
    {
    sku: "TL-9031-A",
    name: "Precision Screwdriver Set",
    category: "Tools",
    stock: 0,
    status: "Out of Stock",
    updated: "2026-07-22",
    },
];

    return (
        <div className={styles.tableCard}>
            <div className={styles.tableHeader}>
            <h2>Recent Items</h2>

            <button>View all</button>
            </div>

            <div className={styles.tableWrapper}>
            <table>
                <thead>
                <tr>
                    <th>SKU</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                </tr>
                </thead>

                <tbody>
                {recentItems.map((item) => (
                    <tr key={item.sku}>
                    <td>{item.sku}</td>

                    <td>{item.name}</td>

                    <td>{item.category}</td>

                    <td>{item.stock}</td>

                    <td>
                        <span
                        className={
                            item.status === "In Stock"
                            ? styles.stock
                            : item.status === "Low Stock"
                            ? styles.low
                            : styles.out
                        }
                        >
                        {item.status}
                        </span>
                    </td>

                    <td>{item.updated}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    

    );
}