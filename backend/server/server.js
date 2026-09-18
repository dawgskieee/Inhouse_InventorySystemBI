const express = require('express');
const cors = require('cors');
require("dotenv").config({ path: "./config.env" });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pg = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

const itemsRoutes = require("../routes/items");
app.use("/items", itemsRoutes);

const assetsRoutes = require("../routes/assets");
app.use("/assets", assetsRoutes);,lk 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});