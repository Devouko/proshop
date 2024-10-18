const notfound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);  // Pass the error to the next middleware (errorHandler)
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Check if the error is a CastError for an invalid ObjectId
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = 'Resource not found';
        statusCode = 404;
    }

    // Send error response
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'PRODUCTION' ? '😊' : err.stack,  // Show stack only in development
    });
};

export { errorHandler, notfound };
