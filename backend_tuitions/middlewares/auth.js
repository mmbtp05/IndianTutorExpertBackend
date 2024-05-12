const jwt = require("jsonwebtoken");
const customError = require("../utils/customeError");
const expressAsyncHandler = require("express-async-handler");

const isAuthenticate = expressAsyncHandler(async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ");

    if (!token) {
        return res
            .status(401)
            .json(customError('Authorization token not provided.'));
    }
    try {
        const decoded = jwt.verify(token[1], process.env.TOKEN_KEY);
        req.user_details = decoded;
        req.user_id = decoded.id;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res
                .status(401)
                .json(customError("Token has expired. Please log in again."));
        } else if (error.name === "JsonWebTokenError") {
            return res
                .status(401)
                .json(customError("Unauthorized token."));
        } else {
            next();
        }
    }
});

module.exports = isAuthenticate