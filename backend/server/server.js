const express = require('express');
const cors = require('cors');
require("dotenv").config({ path: "./config.env" });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require("../db/db");
const verifyToken = require("../middleware/auth");
const app = express();

app.use(cors());
app.use(express.json());


const itemsRoutes = require("../routes/items");
app.use("/items", verifyToken, itemsRoutes); 

const assetsRoutes = require("../routes/assets");
app.use("/assets", verifyToken, assetsRoutes);

const usersRoutes = require("../routes/users");
app.use("/api/users", verifyToken, usersRoutes);

const logsRoutes = require("../routes/logs");
app.use("/api/logs", verifyToken, logsRoutes);


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------- REGISTER ROUTE ----------
app.post('/api/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const existing = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, role',
      [username, email, hashedPassword, role || 'staff']
    );

    res.status(201).json({ message: 'User created', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});