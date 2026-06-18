const authService = require("./auth.service");

const {
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  verifyResetOtpSchema,
  resetPasswordSchema,
} = require("./auth.validation");

class AuthController {
  /**
   * LOGIN
   */
  async login(req, res) {
    try {
      const { error } = loginSchema.validate(req.body);
      if (error)
        return res.status(400).json({
          message: error.details?.[0]?.message,
        });

      const { phone, password } = req.body;

      const result = await authService.login(phone, password);

      res.json(result);
    } catch (err) {
      res.status(400).json({
        message: err.message || "Login failed",
      });
    }
  }

  /**
   * REFRESH TOKEN
   */
  async refreshToken(req, res) {
    try {
      const { error } = refreshTokenSchema.validate(req.body);
      if (error)
        return res.status(400).json({
          message: error.details?.[0]?.message,
        });

      const { refreshToken } = req.body;

      const result = await authService.refreshToken(refreshToken);

      res.json(result);
    } catch (err) {
      res.status(400).json({
        message: err.message || "Refresh token failed",
      });
    }
  }

  /**
   * LOGOUT
   */
  async logout(req, res) {
    try {
      const userId = req.user.id;

      const result = await authService.logout(userId);

      res.json(result);
    } catch (err) {
      res.status(400).json({
        message: err.message || "Logout failed",
      });
    }
  }

  /**
   * FORGOT PASSWORD
   */
  async forgotPassword(req, res) {
    try {
      const { error } = forgotPasswordSchema.validate(req.body);
      if (error)
        return res.status(400).json({
          message: error.details?.[0]?.message,
        });

      const { phone } = req.body;

      const result = await authService.forgotPassword(phone);

      res.json(result);
    } catch (err) {
      res.status(400).json({
        message: err.message || "Forgot password failed",
      });
    }
  }

  /**
   * VERIFY RESET OTP
   */
  async verifyResetOtp(req, res) {
    try {
      const { error } = verifyResetOtpSchema.validate(req.body);
      if (error)
        return res.status(400).json({
          message: error.details?.[0]?.message,
        });

      const { phone, otp } = req.body;

      const result = await authService.verifyResetOtp(
        phone,
        otp
      );

      res.json(result);
    } catch (err) {
      res.status(400).json({
        message: err.message || "OTP verification failed",
      });
    }
  }

  /**
   * RESET PASSWORD
   */
  async resetPassword(req, res) {
    try {
      const { error } = resetPasswordSchema.validate(req.body);
      if (error)
        return res.status(400).json({
          message: error.details?.[0]?.message,
        });

      const { resetToken, newPassword } = req.body;

      const result = await authService.resetPassword(
        resetToken,
        newPassword
      );

      res.json(result);
    } catch (err) {
      res.status(400).json({
        message: err.message || "Reset password failed",
      });
    }
  }
}

module.exports = new AuthController();