"use client";

import { useState } from "react";
import styles from "./landing.module.css";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Cards from "../components/cards";
import Body from "../components/body";
import Table from "../components/table";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div
        className={`${styles.content} ${
          open ? styles.contentFull : ""
        }`}
      >
      <Navbar />
      </div>
      <Body />
      <Cards />
      <Table />
      </div>
  );
}