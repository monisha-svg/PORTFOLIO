const express = require('express');
const cors = require('cors');
const app = express();

// Import database
const db = require('./db');

// PORT for Render
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors({
    origin: 'https://monisha-svg.github.io'
}));
app.use(express.json());

// GET route
app.get('/', (req, res) => {
    res.send('Server is running successfully!');
});

// POST route
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ success: true, message: 'Message sent successfully!' });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is live and running on port ${PORT}`);
});