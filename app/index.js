import express from 'express';
import mysql from 'mysql/promise';

const app = express();
const port = process.env.APP_PORT || 3000;
const dbConfig = {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_ROOT_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'testdb',
  };
const pool = mysql.createPool(dbConfig);

if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        res.set('Cache-Control', 'public, max-age=300');
        next();        
    })
}

app.get('/', async (req, res) =>  {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at:\n\nhttp://localhost:${port}`);
});
