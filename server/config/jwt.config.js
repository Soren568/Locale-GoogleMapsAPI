const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {
    // console.log(req);
    console.log("\n", req.headers.cookie)
    // console.log("\n substring: ", req.headers.cookie.substring(96))
    jwt.verify(req.headers.cookie.substring(96), process.env.FIRST_SECRET_KEY, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
            console.log(err)
        } else {
            next();
        }
    });
}