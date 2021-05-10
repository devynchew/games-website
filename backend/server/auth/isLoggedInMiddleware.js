
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config.js");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
    res.status(401).send();
    return;
  }
  const token = authHeader.replace("Bearer ", "");
  console.log(token);
  jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }, (error, decodedToken) => {
    if (error) {
      res.status(401).send();
      console.log(JWT_SECRET);
      return;
    }
    req.decodedToken = decodedToken;
    console.log(decodedToken);
    next();
  });
};