const pool = require("../db/db");

const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, username, email, role, created_at FROM users ORDER BY id ASC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!["admin", "staff"].includes(role)) {
            return res.status(400).json({ error: "Role must be 'admin' or 'staff'" });
        }

        const result = await pool.query(
            "UPDATE users SET role = $1 WHERE id = $2 RETURNING id, username, email, role, created_at",
            [role, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update user role" });
    }
};

module.exports = { getAllUsers, updateUserRole };