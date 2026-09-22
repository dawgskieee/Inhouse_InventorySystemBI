"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../landingpage/landing.module.css";

type Employee = {
  id: number;
  assigned_to: string;
  department: string;
  device_type: string;
  brand: string;
  model: string;
  processor: string;
  storage: string;
  memory: string;
  serial_number: string;
  status: string;
};

export default function HeadOffice() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState("All Departments");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Employee | null>(null);
  const [saving, setSaving] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchAssets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/assets?location_type=head_office"
      );
      setEmployees(response.data);
    } catch (err) {
      console.error("Failed to fetch head office assets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const filteredEmployees =
    department === "All Departments"
      ? employees
      : employees.filter((employee) => employee.department === department);

  const total = filteredEmployees.length;
  const active = filteredEmployees.filter((e) => e.status === "Active").length;
  const laptops = filteredEmployees.filter((e) => e.device_type === "Laptop").length;
  const tablets = filteredEmployees.filter((e) => e.device_type === "Tablet").length;

  const openEdit = (item: Employee) => {
    setEditingAsset({ ...item });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingAsset) return;
    setSaving(true);
    try {
      await axios.put(`http://localhost:5000/assets/${editingAsset.id}`, {
        asset_tag: (editingAsset as any).asset_tag || null,
        assigned_to: editingAsset.assigned_to,
        device_type: editingAsset.device_type,
        brand: editingAsset.brand,
        model: editingAsset.model,
        processor: editingAsset.processor,
        storage: editingAsset.storage,
        memory: editingAsset.memory,
        serial_number: editingAsset.serial_number,
        status: editingAsset.status,
        location_type: "head_office",
        department: editingAsset.department,
        store_name: null,
      });
      setShowEditModal(false);
      setEditingAsset(null);
      fetchAssets();
    } catch (err) {
      console.error("Failed to update asset:", err);
    } finally {
      setSaving(false);
    }
  };

  const openDeleteConfirm = (id: number) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (deletingId === null) return;
    try {
      await axios.delete(`http://localhost:5000/assets/${deletingId}`);
      setShowDeleteModal(false);
      setDeletingId(null);
      fetchAssets();
    } catch (err) {
      console.error("Failed to delete asset:", err);
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Head Office Inventory</h1>
          <p>Manage and monitor all Head Office assets.</p>
        </div>
      </div>

      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <label>Department</label>
          <select
            className={styles.filterSelect}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option>All Departments</option>
            <option>Executive</option>
            <option>Accounting</option>
            <option>Human Resources</option>
            <option>Information Technology</option>
            <option>Sales</option>
            <option>Marketing</option>
            <option>Operations</option>
            <option>Administration</option>
          </select>
        </div>
      </div>

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
            <h2>{laptops}</h2>
          </div>
          <div className={styles.inventoryCard}>
            <small>Tablets</small>
            <h2>{tablets}</h2>
          </div>
        </div>

        <div className={styles.inventoryTableCard}>
          {loading ? (
            <p style={{ padding: "20px" }}>Loading...</p>
          ) : (
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
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((item) => (
                    <tr key={item.id}>
                      <td>{item.assigned_to}</td>
                      <td>{item.department}</td>
                      <td>{item.device_type}</td>
                      <td>{item.brand}</td>
                      <td>{item.model}</td>
                      <td>{item.processor}</td>
                      <td>{item.storage}</td>
                      <td>{item.memory}</td>
                      <td>{item.serial_number}</td>
                      <td>
                        <span className={styles.activeBadge}>{item.status}</span>
                      </td>
                      <td style={{ display: "flex", gap: "8px" }}>
                        <button className={styles.editBtn} onClick={() => openEdit(item)}>
                          Edit
                        </button>
                        <button
                          className={styles.editBtn}
                          style={{ background: "#ef4444" }}
                          onClick={() => openDeleteConfirm(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} style={{ textAlign: "center", padding: "20px" }}>
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* EDIT MODAL */}
      {showEditModal && editingAsset && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard} style={{ width: 420, textAlign: "left" }}>
            <h3 style={{ marginBottom: 16 }}>Edit Asset</h3>

            {[
              ["Assigned To", "assigned_to"],
              ["Department", "department"],
              ["Device Type", "device_type"],
              ["Brand", "brand"],
              ["Model", "model"],
              ["Processor", "processor"],
              ["Storage", "storage"],
              ["Memory", "memory"],
              ["Serial Number", "serial_number"],
            ].map(([label, key]) => (
              <div className={styles.inputGroup} key={key}>
                <label style={{ color: "#334155", textTransform: "none" }}>{label}</label>
                <input
                  value={(editingAsset as any)[key] || ""}
                  onChange={(e) =>
                    setEditingAsset({ ...editingAsset, [key]: e.target.value } as Employee)
                  }
                  style={{ background: "#f1f5f9", color: "#1e293b", border: "1px solid #dbe3ec" }}
                />
              </div>
            ))}

            <div className={styles.filterGroup}>
              <label>Status</label>
              <select
                className={styles.filterSelect}
                style={{ width: "100%" }}
                value={editingAsset.status}
                onChange={(e) => setEditingAsset({ ...editingAsset, status: e.target.value })}
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Retired</option>
              </select>
            </div>

            <div className={styles.modalActions} style={{ marginTop: 20 }}>
              <button className={styles.modalCancelBtn} onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button
                className={styles.modalConfirmBtn}
                style={{ background: "#2563eb" }}
                onClick={handleSaveEdit}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h3>Delete asset?</h3>
            <p>This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancelBtn} onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className={styles.modalConfirmBtn} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}