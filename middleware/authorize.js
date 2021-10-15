const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    let token = req.header('Authorization');
    if (!token) return res.status(40).send("Access denied.No token provided");
    try {
        const decoded = jwt.verify(token.split(" ")[1].trim(), process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(400).send("Invalid token");
    }
}