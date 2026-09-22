"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../landingpage/landing.module.css";

type Asset = {
  id: number;
  asset_tag: string;
  assigned_to: string;
  store_name: string;
  device_type: string;
  serial_number: string;
  status: string;
};

export default function StoreInventory() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [saving, setSaving] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchAssets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/assets?location_type=store"
      );
      setAssets(response.data);
    } catch (err) {
      console.error("Failed to fetch store assets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const total = assets.length;
  const active = assets.filter((a) => a.status === "Active").length;
  const pending = assets.filter((a) => a.status === "Pending").length;
  const retired = assets.filter((a) => a.status === "Retired").length;

  const openEdit = (item: Asset) => {
    setEditingAsset({ ...item });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingAsset) return;
    setSaving(true);
    try {
      await axios.put(`http://localhost:5000/assets/${editingAsset.id}`, {
        asset_tag: editingAsset.asset_tag,
        assigned_to: editingAsset.assigned_to,
        device_type: editingAsset.device_type,
        status: editingAsset.status,
        location_type: "store",
        store_name: editingAsset.store_name,
        department: null,
        serial_number: editingAsset.serial_number,
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
    <section className={styles.inventoryContent}>
      <div className={styles.inventoryHeader}>
        <div>
          <h1>Store Inventory</h1>
          <p>Manage all store assets.</p>
        </div>
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
          <small>Pending</small>
          <h2 className={styles.orange}>{pending}</h2>
        </div>
        <div className={styles.inventoryCard}>
          <small>Retired</small>
          <h2 className={styles.red}>{retired}</h2>
        </div>
      </div>

      <div className={styles.inventoryTableCard}>
        {loading ? (
          <p style={{ padding: "20px" }}>Loading...</p>
        ) : (
          <table className={styles.inventoryTable}>
            <thead>
              <tr>
                <th>Asset Tag</th>
                <th>Assigned To</th>
                <th>Store</th>
                <th>Device</th>
                <th>Serial Number</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((item) => (
                <tr key={item.id}>
                  <td>{item.asset_tag}</td>
                  <td>{item.assigned_to}</td>
                  <td>{item.store_name}</td>
                  <td>{item.device_type}</td>
                  <td>{item.serial_number}</td>
                  <td>
                    <span
                      className={
                        item.status === "Active"
                          ? styles.activeBadge
                          : item.status === "Pending"
                          ? styles.pendingBadge
                          : styles.retiredBadge
                      }
                    >
                      {item.status}
                    </span>
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
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* EDIT MODAL */}
      {showEditModal && editingAsset && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard} style={{ width: 400, textAlign: "left" }}>
            <h3 style={{ marginBottom: 16 }}>Edit Asset</h3>

            {[
              ["Asset Tag", "asset_tag"],
              ["Assigned To", "assigned_to"],
              ["Store", "store_name"],
              ["Device Type", "device_type"],
              ["Serial Number", "serial_number"],
            ].map(([label, key]) => (
              <div className={styles.inputGroup} key={key}>
                <label style={{ color: "#334155", textTransform: "none" }}>{label}</label>
                <input
                  value={(editingAsset as any)[key] || ""}
                  onChange={(e) =>
                    setEditingAsset({ ...editingAsset, [key]: e.target.value } as Asset)
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
                <option>Pending</option>
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