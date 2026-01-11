const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Check token in cookies first, then Authorization header
    let token = req.cookies.token;

    if (!token) {
      // Check Authorization header: "Bearer token"
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.slice(7);
      }
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

module.exports = authMiddleware;