"use client";
import { useState } from "react";
import styles from "./landing.module.css";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Cards from "../components/cards";
import Table from "../components/table";
import Charts from "../components/charts";
import Page from "../components/page";
import Header from "../components/header";
import Overlay from "../components/overlay";
import Main from "../components/main";
export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className={styles.container}>
      <Overlay />
      <Sidebar />
      <Main />
      <Header />
      <Navbar />
      <Page />
      <Cards />
      <Charts />
      <Table />
    </div>
  );
}