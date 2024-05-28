const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dbConfig = require('C:/Users/SiddhiSiddhesh/assesment/database');

const app = express();
const port = 33060;

app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection(dbConfig);

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/login', (req, res) => {
    const { loginType, username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ? AND type = ?';
    db.query(query, [username, password, loginType], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'query error' });
        } else if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    });
});

app.post('/registerCompany', (req, res) => {
    const { companyName, companyAddress, companyUsername, companyPassword } = req.body;

    const query = 'INSERT INTO companies (name, address, username, password) VALUES (?, ?, ?, ?)';
    db.query(query, [companyName, companyAddress, companyUsername, companyPassword], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else {
            res.json({ success: true });
        }
    });
});

app.get('/getCompanies', (req, res) => {
    const query = 'SELECT * FROM companies';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else {
            res.json({ success: true, companies: results });
        }
    });
});

app.get('/getCompanyDetails', (req, res) => {
    const username = req.query.username;

    const query = 'SELECT * FROM companies WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else if (results.length > 0) {
            res.json({ success: true, company: results[0] });
        } else {
            res.json({ success: false, message: 'Company not found' });
        }
    });
});

app.delete('/deleteCompany/:id', (req, res) => {
    const companyId = req.params.id;

    const query = 'DELETE FROM companies WHERE id = ?';
    db.query(query, [companyId], (err, results) => {
        if (err) {
            res.status(500).json({ success: false, message: 'Database query error' });
        } else {
            res.json({ success: true });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
