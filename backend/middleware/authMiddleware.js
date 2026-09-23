const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure your JWT payload has: { id: user._id, role: user.role }
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    // Normalizes role check (case-insensitive check prevents 'Admin' vs 'admin' bugs)
    const userRole = req.user.role ? req.user.role.toLowerCase() : "";
    const hasPermission = allowedRoles
      .map((r) => r.toLowerCase())
      .includes(userRole);

    if (!hasPermission) {
      return res.status(403).json({
        message: "Forbidden: Access denied",
      });
    }

    next();
  };
};

module.exports = { protect, authorize };
