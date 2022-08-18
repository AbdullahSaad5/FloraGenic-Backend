const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next("No token provided");
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    return next("No token provided");
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (err) {
    return next(err);
  }
  if (!decodedToken) {
    return next("Invalid token");
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};

module.exports = verifyJWT;
  