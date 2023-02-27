const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const authHeader = req.headers["authorization"];
    let token;
    if (authHeader) {
        // header format: "Bearer {token}"
        token = authHeader.split(" ")[1];
    } else {
        token = null;
    }
    if (token == null) {
        console.log("Error: Empty token");
        return res.status(401).json({verified: false});
    }
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({verified: false});
        }
        req.user = user;
        next();
    });
}