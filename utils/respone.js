module.exports = {
    buildResponse: (res, statusCode = 500, message = "", data = null) => {
        return res.status(statusCode).json({ message: message, data: data });
    }
}