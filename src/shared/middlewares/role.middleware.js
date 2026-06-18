module.exports = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Forbidden: Access denied",
        });
      }

      next();
    } catch (err) {
      return res.status(403).json({
        message: "Role check failed",
      });
    }
  };
};