"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../landingpage/landing.module.css";

type Item = {
  id: number;
  sku: string;
  name: string;
  category: string;
  stock: number;
  status: string;
  updated_at: string;
};

type Props = {
  searchTerm: string;
};

export default function Table({ searchTerm }: Props) {
  const [recentItems, setRecentItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [saving, setSaving] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/items");
      setRecentItems(response.data);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = recentItems.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.sku.toLowerCase().includes(term) ||
      (item.category || "").toLowerCase().includes(term)
    );
  });

  const openEdit = (item: Item) => {
    setEditingItem({ ...item });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingItem) return;
    setSaving(true);
    try {
      await axios.put(`http://localhost:5000/items/${editingItem.id}`, {
        sku: editingItem.sku,
        name: editingItem.name,
        category: editingItem.category,
        stock: Number(editingItem.stock),
        status: editingItem.status,
      });
      setShowEditModal(false);
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      console.error("Failed to update item:", err);
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
      await axios.delete(`http://localhost:5000/items/${deletingId}`);
      setShowDeleteModal(false);
      setDeletingId(null);
      fetchItems();
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  return (
    <div className={styles.tableCard}>
      <div className={styles.tableHeader}>
        <h2>Recent Items</h2>
        <button>View all</button>
      </div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <p style={{ padding: "20px" }}>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.sku}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.stock}</td>
                  <td>
                    <span
                      className={
                        item.status === "In Stock"
                          ? styles.stock
                          : item.status === "Low Stock"
                          ? styles.low
                          : styles.out
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{new Date(item.updated_at).toLocaleDateString()}</td>
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
      {showEditModal && editingItem && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard} style={{ width: 400, textAlign: "left" }}>
            <h3 style={{ marginBottom: 16 }}>Edit Item</h3>

            <div className={styles.inputGroup}>
              <label style={{ color: "#334155", textTransform: "none" }}>SKU</label>
              <input
                value={editingItem.sku}
                onChange={(e) => setEditingItem({ ...editingItem, sku: e.target.value })}
                style={{ background: "#f1f5f9", color: "#1e293b", border: "1px solid #dbe3ec" }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label style={{ color: "#334155", textTransform: "none" }}>Name</label>
              <input
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                style={{ background: "#f1f5f9", color: "#1e293b", border: "1px solid #dbe3ec" }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label style={{ color: "#334155", textTransform: "none" }}>Category</label>
              <input
                value={editingItem.category}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                style={{ background: "#f1f5f9", color: "#1e293b", border: "1px solid #dbe3ec" }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label style={{ color: "#334155", textTransform: "none" }}>Stock</label>
              <input
                type="number"
                value={editingItem.stock}
                onChange={(e) => setEditingItem({ ...editingItem, stock: Number(e.target.value) })}
                style={{ background: "#f1f5f9", color: "#1e293b", border: "1px solid #dbe3ec" }}
              />
            </div>
            <div className={styles.filterGroup}>
              <label>Status</label>
              <select
                className={styles.filterSelect}
                style={{ width: "100%" }}
                value={editingItem.status}
                onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
              >
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
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
            <h3>Delete item?</h3>
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
    </div>
  );
}