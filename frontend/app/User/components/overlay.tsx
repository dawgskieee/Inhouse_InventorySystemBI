"use client";
import styles from "../landingpage/landing.module.css";
"use client";

type OverlayProps = {
sidebarOpen: boolean;
setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Overlay({
sidebarOpen,
setSidebarOpen,
}: OverlayProps) {
return (
    <div
    className={`${styles.overlay} ${
        sidebarOpen ? styles.overlayShow : ""
    }`}
    onClick={() => setSidebarOpen(false)}
    />
);
}