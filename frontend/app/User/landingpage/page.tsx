"use client";

import { useState } from "react";
import styles from "./landing.module.css";

import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

import Dashboard from "../components/dashboard";
import Cards from "../components/cards";
import Charts from "../components/charts";
import Table from "../components/table";

import Inventory from "../components/inventory";
import StoreInventory from "../components/inventory";
import HeadOffice from "../components/headoffice";

export default function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div className={styles.container}>

      <Sidebar
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      />

      <main className={`${styles.main} ${
        sidebarOpen ? styles.mainOpen : styles.mainClosed
        }`}
>

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {currentPage === "dashboard" && (
          <>
            <Dashboard />
            <Cards />
            <Charts />
            <Table />
          </>
        )}

        {currentPage === "inventory" && (
          <Inventory />
        )}

        {currentPage === "store" && (
          <StoreInventory />
        )}

        {currentPage === "headOffice" && (
          <HeadOffice />
        )}

      </main>

    </div>
  );
}