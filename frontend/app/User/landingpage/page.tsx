"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./landing.module.css";

import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import AllItems from "../components/allitems";

import Dashboard from "../components/dashboard";
import Cards from "../components/cards";
import Charts from "../components/charts";
import Table from "../components/table";

import Inventory from "../components/inventory";
import StoreInventory from "../components/inventory";
import HeadOffice from "../components/headoffice";
import Users from "../components/users";
import Logs from "../components/logs";

export default function Home() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      setCheckingAuth(false);
    }
  }, []);

  if (checkingAuth) {
    return <p style={{ padding: "40px" }}>Loading...</p>;
  }

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
      }`}>

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {currentPage === "dashboard" && (
          <>
            <Dashboard />
            <Cards />
            <Charts />
            <Table searchTerm={searchTerm} setCurrentPage={setCurrentPage} />
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

        {currentPage === "logs" && (<Logs />
      )}

        {currentPage === "users" && (
          <Users />
          )}
          {currentPage === "allItems" && (
  <AllItems searchTerm={searchTerm} setCurrentPage={setCurrentPage} />
  )}

      </main>

    </div>
  );
}