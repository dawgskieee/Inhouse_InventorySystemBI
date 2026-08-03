"use client";

import { useState } from "react";
import styles from "../landingpage/landing.module.css";

const employees = [
{
    user: "Sebie Tan",
    department: "Executive",
    device: "Laptop",
    brand: "Lenovo",
    model: "ThinkPad X1 Carbon Gen 13",
    processor: "Intel Core Ultra 7",
    storage: "1TB SSD",
    memory: "16GB",
    serial: "PF5GAVNG",
    status: "Active",
},
{
    user: "Han Tan",
    department: "Executive",
    device: "Tablet",
    brand: "Apple",
    model: "iPad",
    processor: "-",
    storage: "-",
    memory: "-",
    serial: "-",
    status: "Active",
},
];

export default function HeadOffice() {
const [department, setDepartment] = useState("All Departments");

  // Filter employees
const filteredEmployees =
    department === "All Departments"
    ? employees
    : employees.filter(
        (employee) => employee.department === department
        );

  // Dynamic counts
const total = filteredEmployees.length;
const active = filteredEmployees.filter(
    (e) => e.status === "Active"
).length;
const laptops = filteredEmployees.filter(
    (e) => e.device === "Laptop"
).length;
const tablets = filteredEmployees.filter(
    (e) => e.device === "Tablet"
).length;

return (
    <section className={styles.page}>
    <div className={styles.pageHeader}>
        <div>
        <h1>Head Office Inventory</h1>
        <p>Manage and monitor all Head Office assets.</p>
        </div>
    </div>

      {/* FILTER */}
    <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
        <label>Department</label>

        <select
            className={styles.filterSelect}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
        >
            <option>All Departments</option>
            <option>Executive</option>
            <option>Accounting</option>
            <option>Human Resources</option>
            <option>Information Technology</option>
            <option>Sales</option>
            <option>Marketing</option>
            <option>Operations</option>
            <option>Administration</option>
        </select>
        </div>
    </div>

    <section className={styles.inventoryContent}>
        <div className={styles.inventoryHeader}>
        <h1>Head Office Inventory</h1>
        <p>Beyond Innovations Inc.</p>
        </div>

        {/* Cards */}
        <div className={styles.inventoryCards}>
        <div className={styles.inventoryCard}>
            <small>Total Assets</small>
            <h2>{total}</h2>
        </div>

        <div className={styles.inventoryCard}>
            <small>Active</small>
            <h2 className={styles.green}>{active}</h2>
        </div>

        <div className={styles.inventoryCard}>
            <small>Laptops</small>
            <h2>{laptops}</h2>
        </div>

        <div className={styles.inventoryCard}>
            <small>Tablets</small>
            <h2>{tablets}</h2>
        </div>
        </div>

        {/* Table */}
        <div className={styles.inventoryTableCard}>
        <table className={styles.inventoryTable}>
            <thead>
            <tr>
                <th>User</th>
                <th>Department</th>
                <th>Device</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Processor</th>
                <th>Storage</th>
                <th>Memory</th>
                <th>Serial Number</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>

            <tbody>
                {filteredEmployees.length > 0 ? (
                filteredEmployees.map((item, index) => (
                <tr key={index}>
                    <td>{item.user}</td>
                    <td>{item.department}</td>
                    <td>{item.device}</td>
                    <td>{item.brand}</td>
                    <td>{item.model}</td>
                    <td>{item.processor}</td>
                    <td>{item.storage}</td>
                    <td>{item.memory}</td>
                    <td>{item.serial}</td>

                    <td>
                    <span className={styles.activeBadge}>
                        {item.status}
                    </span>
                    </td>

                    <td>
                    <button className={styles.editBtn}>
                        Edit
                    </button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan={11} style={{ textAlign: "center", padding: "20px" }}>
                    No records found.
                </td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    </section>
    </section>
);
}