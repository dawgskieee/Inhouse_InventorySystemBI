const express = require("express");
const router = express.Router();
const { getAllUsers, updateUserRole } = require("../controllers/usersController");
const checkAdmin = require("../middleware/checkAdmin");

router.get("/", checkAdmin, getAllUsers);
router.put("/:id/role", checkAdmin, updateUserRole);

module.exports = router;