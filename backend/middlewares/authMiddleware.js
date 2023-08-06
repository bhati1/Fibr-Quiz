const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");

module.exports = (req, res, next) => {
try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;
    req.body.userId = userId;
    next();
} catch (error) {
    res.status(401).send({
    message: "You are not authenticated",
    data: error,
    success: false,
    }); return;
}
};