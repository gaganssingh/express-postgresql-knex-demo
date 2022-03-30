// // When using the express-session library
// const requireAuth = (req, res, next) => {
//   if (!req.session || !req.session.user) {
//     return res.status(401).json({ message: "Unauthorized request" });
//   }
//   next();
// };

// // When using JWT
const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  // Receive the token from the front end
  // on the Authorization Header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized request" });
  }

  const secret = process.env.JWT_SECRET;
  jwt.verify(token, secret, (error, decodedToken) => {
    if (error) {
      throw new Error({ message: "Unauthorized request" });
    }

    req.decodedToken = decodedToken;
  });

  next();
};

module.exports = requireAuth;
