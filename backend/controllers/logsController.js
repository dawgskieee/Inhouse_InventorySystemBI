const pool = require("../db/db");

const getLogs = async (req, res) => {
    try {
        let result;
        if (req.user.role === "admin") {
            result = await pool.query("SELECT * FROM activity_logs ORDER BY created_at DESC");
        } else {
            result = await pool.query(
                "SELECT * FROM activity_logs WHERE user_id = $1 ORDER BY created_at DESC",
                [req.user.id]
            );
        }
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch logs" });
    }
};

const deleteLog = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "DELETE FROM activity_logs WHERE id = $1 AND user_id = $2 RETURNING *",
            [id, req.user.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Log not found or you don't have permission to delete it" });
        }
        res.json({ message: "Log deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete log" });
    }
};

module.exports = { getLogs, deleteLog };