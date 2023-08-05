const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'hello');
    const userId = decodedToken.userId;
    req.body.userId = userId;
    next();
} catch (error) {
    res.status(401).send({
    message: "You are not authenticated",
    data: error,
    success: false,
    });
}
};