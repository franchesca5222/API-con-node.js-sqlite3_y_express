// middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error(err.stack);  // Loguea el error en la consola (opcional)

    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
}

module.exports = errorHandler;