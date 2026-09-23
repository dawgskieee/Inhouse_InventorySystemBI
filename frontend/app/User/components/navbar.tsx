"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/axios";
import styles from "../landingpage/landing.module.css";

type Props = {
sidebarOpen: boolean;
setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
searchTerm: string;
setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({
sidebarOpen,
setSidebarOpen,
searchTerm,
setSearchTerm,
}: Props) {
     const router = useRouter();
     const [showLogoutModal, setShowLogoutModal] = useState(false);
     const [showAddModal, setShowAddModal] = useState(false);
     const [addType, setAddType] = useState<"item" | "asset">("item");
     const [saving, setSaving] = useState(false);
     const [addError, setAddError] = useState("");

     // Item fields
     const [sku, setSku] = useState("");
     const [name, setName] = useState("");
     const [category, setCategory] = useState("");
     const [stock, setStock] = useState("");
     const [itemStatus, setItemStatus] = useState("In Stock");

     // Asset fields
     const [assetTag, setAssetTag] = useState("");
     const [assignedTo, setAssignedTo] = useState("");
     const [deviceType, setDeviceType] = useState("");
     const [locationType, setLocationType] = useState<"head_office" | "store">("head_office");
     const [department, setDepartment] = useState("");
     const [storeName, setStoreName] = useState("");
     const [serialNumber, setSerialNumber] = useState("");

     const confirmLogout = () => {
       localStorage.removeItem("token");
       localStorage.removeItem("user");
       router.push("/");
     };

     const resetForm = () => {
       setSku(""); setName(""); setCategory(""); setStock(""); setItemStatus("In Stock");
       setAssetTag(""); setAssignedTo(""); setDeviceType(""); setDepartment("");
       setStoreName(""); setSerialNumber("");
       setAddError("");
     };

     const handleAdd = async () => {
       setAddError("");
       setSaving(true);
       try {
         if (addType === "item") {
           if (!sku || !name) {
             setAddError("SKU and Name are required");
             setSaving(false);
             return;
           }
           await api.post("/items", {
             sku,
             name,
             category,
             stock: Number(stock) || 0,
             status: itemStatus,
           });
         } else {
           if (!assetTag || !deviceType) {
             setAddError("Asset Tag and Device Type are required");
             setSaving(false);
             return;
           }
           await api.post("/assets", {
             asset_tag: assetTag,
             assigned_to: assignedTo,
             device_type: deviceType,
             status: "Active",
             location_type: locationType,
             department: locationType === "head_office" ? department : null,
             store_name: locationType === "store" ? storeName : null,
             serial_number: serialNumber,
           });
         }

         // Pinakasimpleng paraan para ma-refresh ang lahat ng components
         window.location.reload();
       } catch (err: any) {
         setAddError(err.response?.data?.error || "Failed to save");
         setSaving(false);
       }
     };

return (
    <nav className={styles.navbar}>
    <div className={styles.leftNav}>
        <button
        className={styles.hamburger}    
        onClick={() => setSidebarOpen(!sidebarOpen)}
        >
        ☰
        </button>

        <div style={{ position: "relative" }}>
        <span
            style={{
            position: "absolute",
            left: 12,
            top: 11,
            color: "#64748b",
            fontSize: 18,
            }}
        >
            🔍
        </span>

       <input
    className={styles.search}
    placeholder="Search name,asset or serial number"
    style={{ paddingLeft: 40 }}
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
/>
        </div>
    </div>
    <div className={styles.rightNav}>
        <button className={styles.exportBtn}>
    ⬇ Export to Excel
    </button>
    <button className={styles.newAssetBtn} onClick={() => { resetForm(); setShowAddModal(true); }}>
        + New Asset
        </button>
        <div className={styles.userMenu}>
            <button className={styles.userButton} onClick={() => setShowLogoutModal(true)}>
                Logout ▾
                </button>
                </div>
                </div>

                {showLogoutModal && (
                  <div className={styles.modalOverlay}>
                    <div className={styles.modalCard}>
                      <h3>Log out?</h3>
                      <p>You'll need to log in again to access your dashboard.</p>
                      <div className={styles.modalActions}>
                        <button
                          className={styles.modalCancelBtn}
                          onClick={() => setShowLogoutModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className={styles.modalConfirmBtn}
                          onClick={confirmLogout}
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {showAddModal && (
                  <div className={styles.modalOverlay}>
                    <div className={styles.modalCard} style={{ width: 440, textAlign: "left" }}>
                      <h3 style={{ marginBottom: 16 }}>Add New</h3>

                      <div className={styles.filterGroup} style={{ marginBottom: 16 }}>
                        <label>Type</label>
                        <select
                          className={styles.filterSelect}
                          style={{ width: "100%" }}
                          value={addType}
                          onChange={(e) => setAddType(e.target.value as "item" | "asset")}
                        >
                          <option value="item">Item (stock)</option>
                          <option value="asset">Asset (device)</option>
                        </select>
                      </div>

                      {addError && <p style={{ color: "red", marginBottom: 12 }}>{addError}</p>}

                      {addType === "item" ? (
                        <>
                          <div className={styles.inputGroup}>
                            <label style={{ color: "#334155", textTransform: "none" }}>SKU</label>
                            <input value={sku} onChange={(e) => setSku(e.target.value)}
                              style={{ background: "#f1f5f9", color: "#1e293b", border: "1px solid #dbe3ec" }} />
                          </div>
                          <div className={styles.inputGroup}>
                            <label style={{ color: "#334155", textTransform: "none" }}>Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)}
                              style={{ background: "#f1f5f9", color: "#1e293b", border: "1px solid #dbe3ec" }} />
                          </div>
                          <div className={styles.inputGroup}>
                            <label style={{ color: "#334155", textTransform: "none" }}>Category</label>
                            <input value={category} onChange={(e) => setCategory(e.target.value)}
                              style={{ background: "#f1f5f9", color: "#1e293b", border: "1px solid #dbe3ec" }} />
                          </div>
                          <div className={styles.inputGroup}>
                            <label style={{ color: "#334155", textTransform: "none" }}>Stock</label>
                            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)}
                              style={{ background: "#f1f5f9", color: "#1e293b", border: "1px solid #dbe3ec" }} />
                          </div>
                          <div className={styles.filterGroup}>
                            <label>Status</label>
                            <select
                              className={styles.filterSelect}
                              style={{ width: "100%" }}
                              value={itemStatus}
                              onChange={(e) => setItemStatus(e.target.value)}
                            >
                              <option>In Stock</option>
                              <option>Low Stock</option>
                              <option>Out of Stock</option>
                            </select>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={styles.filterGroup} style={{ marginBottom: 16 }}>
                            <label>Location</label>
                            <select
                              className={styles.filterSelect}
                              style={{ width: "100%" }}
                              value={locationType}
                              onChange={(e) => setLocationType(e.target.value as "head_office" | "store")}
                            >
                              <option value="head_office">Head Office</option>
                              <option value="store">Store</option>
                            </select>
                          </div>
                          <div className={styles.inputGroup}>
                            <label style={{ color: "#334155", textTransform: "none" }}>Asset Tag</label>
                            <input value={assetTag} onChange={(e) => setAssetTag(e.target.value)}
                              style={{ background: "#f1f5f9", color: "#1e293b", border: "1px solid #dbe3ec" }} />
                          </div>
                          <div className={styles.inputGroup}>
                            <label style={{ color: "#334155", textTransform: "none" }}>Assigned To</label>
                            <input value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}
                              style={{ background: "#f1f5f9", color: "#1e293b", border: "1px solid #dbe3ec" }} />
                          </div>
                          <div className={styles.inputGroup}>
                            <label style={{ color: "#334155", textTransform: "none" }}>Device Type</label>
                            <input value={deviceType} onChange={(e) => setDeviceType(e.target.value)}
                              style={{ background: "#f1f5f9", color: "#1e293b", border: "1px solid #dbe3ec" }} />
                          </div>
                          {locationType === "head_office" ? (
                            <div className={styles.inputGroup}>
                              <label style={{ color: "#334155", textTransform: "none" }}>Department</label>
                              <input value={department} onChange={(e) => setDepartment(e.target.value)}
                                style={{ background: "#f1f5f9", color: "#1e293b", border: "1px solid #dbe3ec" }} />
                            </div>
                          ) : (
                            <div className={styles.inputGroup}>
                              <label style={{ color: "#334155", textTransform: "none" }}>Store</label>
                              <input value={storeName} onChange={(e) => setStoreName(e.target.value)}
                                style={{ background: "#f1f5f9", color: "#1e293b", border: "1px solid #dbe3ec" }} />
                            </div>
                          )}
                          <div className={styles.inputGroup}>
                            <label style={{ color: "#334155", textTransform: "none" }}>Serial Number</label>
                            <input value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)}
                              style={{ background: "#f1f5f9", color: "#1e293b", border: "1px solid #dbe3ec" }} />
                          </div>
                        </>
                      )}

                      <div className={styles.modalActions} style={{ marginTop: 20 }}>
                        <button
                          className={styles.modalCancelBtn}
                          onClick={() => setShowAddModal(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className={styles.modalConfirmBtn}
                          style={{ background: "#2563eb" }}
                          onClick={handleAdd}
                          disabled={saving}
                        >
                          {saving ? "Saving..." : "Add"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                </nav>
);
}