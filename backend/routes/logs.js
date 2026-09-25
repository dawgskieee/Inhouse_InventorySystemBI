const express = require("express");
const router = express.Router();
const { getLogs, deleteLog } = require("../controllers/logsController");

router.get("/", getLogs);
router.delete("/:id", deleteLog);

module.exports = router;