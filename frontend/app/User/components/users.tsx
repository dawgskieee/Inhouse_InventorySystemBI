"use client";

import { useState, useEffect } from "react";
import api from "../../../lib/axios";
import styles from "../landingpage/landing.module.css";

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/api/users");
        setUsers(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleRoleChange = async (userId: number, newRole: string) => {
    setUpdatingId(userId);
    try {
      await api.put(`/api/users/${userId}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error("Failed to update role:", err);
      alert("Failed to update role.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className={styles.inventoryContent}>
      <div className={styles.inventoryHeader}>
        <h1>Users</h1>
        <p>All registered accounts.</p>
      </div>

      <div className={styles.inventoryTableCard}>
        {loading ? (
          <p style={{ padding: "20px" }}>Loading...</p>
        ) : error ? (
          <p style={{ padding: "20px", color: "red" }}>{error}</p>
        ) : (
          <table className={styles.inventoryTable}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <select
                      className={styles.filterSelect}
                      style={{ width: "120px", padding: "6px 10px", height: "auto" }}
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      disabled={updatingId === u.id}
                    >
                      <option value="staff">staff</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td>{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}