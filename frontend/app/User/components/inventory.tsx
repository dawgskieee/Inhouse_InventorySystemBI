"use client";

import styles from "../landingpage/landing.module.css";

const assets = [
{
    assetTag: "ST-001",
    assignedTo: "Juan Dela Cruz",
    store: "SM Dasma",
    device: "Lenovo ThinkPad",
    serial: "PF3A81XX",
    status: "Active",
},
{
    assetTag: "ST-002",
    assignedTo: "Maria Santos",
    store: "SM Bacoor",
    device: "Dell Optiplex",
    serial: "DL9A201A",
    status: "Pending",
},
{
    assetTag: "ST-003",
    assignedTo: "Pedro Cruz",
    store: "SM Imus",
    device: "Acer Aspire",
    serial: "AC22817",
    status: "Retired",
},
];

export default function StoreInventory() {
const total = assets.length;
const active = assets.filter(a => a.status === "Active").length;
const pending = assets.filter(a => a.status === "Pending").length;
const retired = assets.filter(a => a.status === "Retired").length;

return (
    <section className={styles.inventoryContent}>

      {/* TITLE */}

    <div className={styles.inventoryHeader}>
        <div>
        <h1>Store Inventory</h1>
        <p>Manage all store assets.</p>
        </div>
    </div>

      {/* CARDS */}

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
        <small>Pending</small>
        <h2 className={styles.orange}>{pending}</h2>
        </div>

        <div className={styles.inventoryCard}>
        <small>Retired</small>
        <h2 className={styles.red}>{retired}</h2>
        </div>

    </div>

      {/* TABLE */}

    <div className={styles.inventoryTableCard}>

        <table className={styles.inventoryTable}>

        <thead>

            <tr>

            <th>Asset Tag</th>

            <th>Assigned To</th>

            <th>Store</th>

            <th>Device</th>

            <th>Serial Number</th>

            <th>Status</th>

            <th>Action</th>

            </tr>

            </thead>

        <tbody>

            {assets.map((item, index) => (

            <tr key={index}>

                <td>{item.assetTag}</td>

                <td>{item.assignedTo}</td>

                <td>{item.store}</td>

                <td>{item.device}</td>

                <td>{item.serial}</td>

                <td>

                <span
                    className={
                    item.status === "Active"
                        ? styles.activeBadge
                        : item.status === "Pending"
                        ? styles.pendingBadge
                        : styles.retiredBadge
                    }
                >
                    {item.status}
                </span>

                </td>

                <td>

                <button className={styles.editBtn}>
                    Edit
                </button>

                </td>

            </tr>

            ))}

        </tbody>

        </table>

    </div>

    </section>
);
}