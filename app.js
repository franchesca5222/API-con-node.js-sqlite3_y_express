const express = require('express');
const bodyParser = require('body-parser');
const postsRoutes = require('./routes/posts');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/posts', postsRoutes);

// Middleware de manejo de errores
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
};
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
