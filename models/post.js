const db = require('../db/connection');

const createPost = (author, title, isPublished, callback) => {
    const timestamp = Date.now();
    const publishedDate = isPublished ? timestamp : null;

    db.run(
        `INSERT INTO posts (author, title, ispublished, timestamp, publisheddate) VALUES (?, ?, ?, ?, ?)`,
        [author, title, isPublished, timestamp, publishedDate],
        function(err) {
            if (err) {
                return callback(err);
            }
            callback(null, { id: this.lastID, author, title, isPublished, timestamp, publishedDate });
        }
    );
};

const getPosts = (filters, callback) => {
    let query = `SELECT * FROM posts`;
    const params = [];

    if (filters.author) {
        query += ` WHERE author = ?`;
        params.push(filters.author);
    }

    if (filters.ispublished !== undefined) {
        query += filters.author ? ` AND` : ` WHERE`;
        query += ` ispublished = ?`;
        params.push(filters.ispublished);
    }

    query += ` ORDER BY id ASC`;

    db.all(query, params, (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
};

const getPostById = (id, callback) => {
    db.get(`SELECT * FROM posts WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return callback(err);
        }
        callback(null, row);
    });
};

module.exports = { createPost, getPosts, getPostById };
