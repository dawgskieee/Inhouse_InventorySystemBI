const checkAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admins only. You don't have permission for this action." });
    }
    next();
};

module.exports = checkAdmin;