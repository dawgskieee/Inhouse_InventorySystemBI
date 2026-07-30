"use client";
import { useState } from "react";
import styles from "./landing.module.css";
import Cards from "../components/cards";
import Table from "../components/table";
import Charts from "../components/charts";
import Dashboard from "../components/dashboard";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
  <div className={styles.container}>
    <Sidebar sidebarOpen={sidebarOpen} />

    <main className={styles.main}>
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Dashboard />
      <Cards />
      <Charts />
      <Table /> 
    </main>
    </div>
  );
}