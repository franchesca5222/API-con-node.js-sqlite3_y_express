const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'blog.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite3 database');
        createTable();
    }
});

function createTable() {
    const createPostsTable = `
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            author INTEGER NOT NULL,
            title TEXT NOT NULL,
            ispublished BOOLEAN NOT NULL,
            timestamp INTEGER NOT NULL,
            publisheddate INTEGER
        );
    `;

    db.run(createPostsTable, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Posts table created or already exists');
        }
    });
}

module.exports = db;
