const express = require("express");
const router = express.Router();
const {
    getAllAssets,
    createAsset,
    updateAsset,
    deleteAsset,
} = require("../controllers/assetsController");

router.get("/", getAllAssets);
router.post("/", createAsset);
router.put("/:id", updateAsset);
router.delete("/:id", deleteAsset);

module.exports = router;

