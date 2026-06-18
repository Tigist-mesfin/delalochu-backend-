const jwt = require("jsonwebtoken");

class TokenService {
  generateAccessToken(user) {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );
  }

  generateRefreshToken(user) {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "30d",
      }
    );
  }

  generateResetToken(user) {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_RESET_SECRET,
      {
        expiresIn: "10m",
      }
    );
  }

  verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  }

  verifyResetToken(token) {
    return jwt.verify(token, process.env.JWT_RESET_SECRET);
  }
}

module.exports = new TokenService();