"use client";

import { useState, useEffect } from "react";
import api from "../../../lib/axios";
import styles from "../landingpage/landing.module.css";

type Log = {
  id: number;
  user_id: number;
  username: string;
  action: string;
  entity_type: string;
  entity_id: number;
  description: string;
  created_at: string;
};

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchLogs = async () => {
    try {
      const response = await api.get("/api/logs");
      setLogs(response.data);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const openDeleteConfirm = (id: number) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (deletingId === null) return;
    try {
      await api.delete(`/api/logs/${deletingId}`);
      setShowDeleteModal(false);
      setDeletingId(null);
      fetchLogs();
    } catch (err) {
      console.error("Failed to delete log:", err);
    }
  };

  const actionColor = (action: string) => {
    if (action === "add") return styles.activeBadge;
    if (action === "edit") return styles.pendingBadge;
    return styles.retiredBadge;
  };

  return (
    <section className={styles.inventoryContent}>
      <div className={styles.inventoryHeader}>
        <h1>Activity Logs</h1>
        <p>History of changes made across the system.</p>
      </div>

      <div className={styles.inventoryTableCard}>
        {loading ? (
          <p style={{ padding: "20px" }}>Loading...</p>
        ) : (
          <table className={styles.inventoryTable}>
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Description</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.username}</td>
                    <td>
                      <span className={actionColor(log.action)}>
                        {log.action.toUpperCase()}
                      </span>
                    </td>
                    <td>{log.description}</td>
                    <td>{new Date(log.created_at).toLocaleString()}</td>
                    <td>
                      <button
                        className={styles.editBtn}
                        style={{ background: "#ef4444" }}
                        onClick={() => openDeleteConfirm(log.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "20px" }}>
                    No activity yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h3>Delete this log entry?</h3>
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