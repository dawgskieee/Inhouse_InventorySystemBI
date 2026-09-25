const pool = require("../db/db");
const createLog = require("../utils/logger");

const normalizeCategory = (text) => {
    if (!text || !text.trim()) return text;
    const trimmed = text.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};

const getAllItems = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM items WHERE is_deleted = FALSE ORDER BY id ASC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch items" });
    }
};

const createItem = async (req, res) => {
    try {
        const { sku, name, category, stock, status } = req.body;
        const normalizedCategory = normalizeCategory(category);

        const result = await pool.query(
            "INSERT INTO items (sku, name, category, stock, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [sku, name, normalizedCategory, stock, status]
        );
        await createLog(req.user.id, req.user.username, "add", "item", result.rows[0].id, `Added item "${name}" (SKU: ${sku})`);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create item" });
    }
};

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { sku, name, category, stock, status } = req.body;
        const normalizedCategory = normalizeCategory(category);

        const result = await pool.query(
            `UPDATE items SET sku=$1, name=$2, category=$3, stock=$4, status=$5, updated_at=NOW() 
             WHERE id=$6 RETURNING *`,
            [sku, name, normalizedCategory, stock, status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Item not found" });
        }
        await createLog(req.user.id, req.user.username, "edit", "item", id, `Updated item "${name}" (SKU: ${sku})`);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update item" });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "UPDATE items SET is_deleted = TRUE WHERE id=$1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Item not found" });
        }

        await createLog(req.user.id, req.user.username, "delete", "item", id, `Deleted item "${result.rows[0].name}" (SKU: ${result.rows[0].sku})`);

        res.json({ message: "Item deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete item" });
    }
};

module.exports = { getAllItems, createItem, updateItem, deleteItem };