import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Inventory Dashboard",
  description: "Inventory Management Dashboard",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}