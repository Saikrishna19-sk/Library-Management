require('dotenv').config();
const express = require('express');
const pool = require('./config/db');

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ message: 'Library API is running and DB connected!' });
    } catch (error) {
        res.json({ message: 'DB connection failed', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));