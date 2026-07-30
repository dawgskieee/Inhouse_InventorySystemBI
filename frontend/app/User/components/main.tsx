"use client";
import { useState } from "react";
import styles from "../landingpage/landing.module.css";
export default function Main() {
    const [open, setOpen] = useState(false);
return (
    <main className={styles.main}></main>
);
}