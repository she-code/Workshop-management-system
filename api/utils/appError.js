class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        //creates stack property
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;