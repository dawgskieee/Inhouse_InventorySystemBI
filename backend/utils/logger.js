const pool = require("../db/db");

const createLog = async (userId, username, action, entityType, entityId, description) => {
    try {
        await pool.query(
            `INSERT INTO activity_logs (user_id, username, action, entity_type, entity_id, description)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [userId, username, action, entityType, entityId, description]
        );
    } catch (err) {
        console.error("Failed to create log:", err);
        // Hindi natin ito i-tha-throw pataas — hindi dapat mabigo ang buong request kung sakaling mabigo lang ang logging
    }
};

module.exports = createLog;