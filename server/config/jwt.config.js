const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
    console.log(req);
    console.log("\n", req.headers.cookie)
    console.log("\n", req.headers.cookie.substring(10))
    jwt.verify(req.headers.cookie.substring(10), process.env.FIRST_SECRET_KEY, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}