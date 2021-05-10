
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
    console.log(decodedToken);
    if (error) {
      res.status(401).send();
      console.log(JWT_SECRET);
      console.log(error);
      return;
    }
    if(decodedToken.role.toLowerCase() == "admin") {
      req.decodedToken = decodedToken;
      console.log("We are here");
      next();
    }
    
  });
};