/**
 * Helper function to standardize success API responses
 * @param {Object} res - Response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Response message
 * @param {Object} data - Optional response data
 */
const sendSuccessResponse = (res, statusCode, message, data = null) => {
    const response = {
        status: 'success',
        message,
    };

    if (data) {
        response.data = data;
    }

    res.status(statusCode).json(response);
};

/**
 * Helper function to standardize error API responses
 * @param {Object} res - Response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Response message
 * @param {Object} error - Optional error object
 */
const sendErrorResponse = (res, statusCode, message, error = null) => {
    const response = {
        status: 'error',
        message,
    };

    if (error) {
        response.error = error;
    }

    res.status(statusCode).json(response);
};

module.exports = { sendSuccessResponse, sendErrorResponse };
