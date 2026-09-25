const pool = require("../db/db");
const createLog = require("../utils/logger");

// GET all assets (optionally filter by location_type)
const getAllAssets = async (req, res) => {
    try {
        const { location_type } = req.query;
        let result;
       if (location_type) {
    result = await pool.query(
        "SELECT * FROM assets WHERE location_type = $1 AND is_deleted = FALSE ORDER BY id ASC",
        [location_type]
    );
} else {
    result = await pool.query("SELECT * FROM assets WHERE is_deleted = FALSE ORDER BY id ASC");
}
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch assets" });
    }
};

// POST a new asset
const createAsset = async (req, res) => {
    try {
        const {
            asset_tag, assigned_to, device_type, brand, model,
            processor, storage, memory, serial_number, status,
            location_type, department, store_name
        } = req.body;

        if (!asset_tag || !asset_tag.trim()) {
            return res.status(400).json({ error: "Asset Tag is required" });
        }
        if (!device_type || !device_type.trim()) {
            return res.status(400).json({ error: "Device Type is required" });
        }
        if (!location_type || !["head_office", "store"].includes(location_type)) {
            return res.status(400).json({ error: "Location type must be 'head_office' or 'store'" });
        }

        const result = await pool.query(
            `INSERT INTO assets 
             (asset_tag, assigned_to, device_type, brand, model, processor, storage, memory, serial_number, status, location_type, department, store_name)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
            [asset_tag, assigned_to, device_type, brand, model, processor, storage, memory, serial_number, status, location_type, department, store_name]
        );
        await createLog(req.user.id, req.user.username, "add", "asset", result.rows[0].id, `Added asset "${asset_tag}" (${device_type})`);
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create asset" });
    }
};

// PUT (update) an asset
const updateAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            asset_tag, assigned_to, device_type, brand, model,
            processor, storage, memory, serial_number, status,
            location_type, department, store_name
        } = req.body;
        const result = await pool.query(
            `UPDATE assets SET 
             asset_tag=$1, assigned_to=$2, device_type=$3, brand=$4, model=$5, 
             processor=$6, storage=$7, memory=$8, serial_number=$9, status=$10,
             location_type=$11, department=$12, store_name=$13, updated_at=NOW()
             WHERE id=$14 RETURNING *`,
            [asset_tag, assigned_to, device_type, brand, model, processor, storage, memory, serial_number, status, location_type, department, store_name, id]
        );
        if (result.rows.length === 0) {
    return res.status(404).json({ error: "Asset not found" });
}
await createLog(req.user.id, req.user.username, "edit", "asset", id, `Updated asset "${asset_tag}" (${device_type})`);
res.json(result.rows[0]);
} catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update asset" });
    }
};

// DELETE an asset
const deleteAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "UPDATE assets SET is_deleted = TRUE WHERE id=$1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
    return res.status(404).json({ error: "Asset not found" });
}await createLog(req.user.id, req.user.username, "delete", "asset", id, `Deleted asset "${result.rows[0].asset_tag}" (${result.rows[0].device_type})`);
res.json({ message: "Asset deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete asset" });
    }
};

module.exports = { getAllAssets, createAsset, updateAsset, deleteAsset };