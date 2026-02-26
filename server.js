const express = require('express');
const cors = require('cors'); // ✅ ADD THIS
const app = express();

// ✅ Import database
const db = require('./db');

// ✅ MIDDLEWARE
app.use(cors()); // ✅ ADD THIS (VERY IMPORTANT)
app.use(express.json());

const PORT = 5000;

// ✅ GET route
app.get('/', (req, res) => {
    res.send('Server is running successfully!');
});

// ✅ POST route
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Database error");
        } else {
            res.send("✅ Message saved successfully");
        }
    });
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});