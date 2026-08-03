"use client";

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

const total = employees.length;
const active = employees.filter(e => e.status === "Active").length;

return (

    <section className={styles.inventoryContent}>

    <div className={styles.inventoryHeader}>
        <h1>Head Office Inventory</h1>
        <p>Beyond Innovations Inc.</p>
    </div>

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
        <h2>1</h2>
        </div>

        <div className={styles.inventoryCard}>
        <small>Tablets</small>
        <h2>1</h2>
        </div>

    </div>

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

            {employees.map((item,index)=>(

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

            ))}

        </tbody>

        </table>

    </div>

    </section>

);
}