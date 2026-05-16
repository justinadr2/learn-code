const https = require('https');
const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

const sslOptions = {
    key: fs.readFileSync('D:/Apache24/conf/ssl/server.key'),
    cert: fs.readFileSync('D:/Apache24/conf/ssl/server.crt')
};

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const webRoot = 'D:/learn/web_https_apache';
const usersFile = path.join(webRoot, 'users.txt');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',      
    password: '',
    database: 'learnweb'
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads');
    
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


app.post('/create-hacker', upload.single('avatar'), (req, res) => {
    const { name, expertise } = req.body;
    const avatarPath = req.file ? '/uploads/' + req.file.filename : null;

    if (!name || !expertise) 
        return res.status(400).send("Name and expertise are required");

    const sql = "INSERT INTO hackers (name_, expertise, avatar_url) VALUES (?, ?, ?)";
    db.query(sql, [name, expertise, avatarPath], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        res.send(`Hacker ${name} registered with photo.`);
    });
});

app.get('/get-hacker/:name', (req, res) => {
    const name = req.params.name;
    db.query("SELECT * FROM hackers WHERE name_ = ?", [name], (err, results) => {
        if (err || results.length === 0) return res.status(404).send("Not found");
        res.json(results[0]); 
    });
});

app.get('/get-hackers', (req, res) => {
    const query = "SELECT name_ FROM hackers";
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        res.json(results);
    });
});

https.createServer(sslOptions, app).listen(port, () => {
    console.log(`Node HTTPS server running at https://127.0.0.1:${port}`);
});