const bcrypt = require("bcrypt");

const redis = require("../user/redis");
const userRepo = require("../user/user.repository");
const smsService = require("../user/sms.service");

const tokenService = require("./token.service");

class AuthService {
  /**
   * Login
   */
  async login(phone, password) {
    const user = await userRepo.findByPhone(phone);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.status !== "ACTIVE") {
      throw new Error("Please verify your phone first");
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      throw new Error("Invalid password");
    }

    const accessToken = tokenService.generateAccessToken(user);

    const refreshToken = tokenService.generateRefreshToken(user);

    await redis.set(
      `refresh:${user.id}`,
      refreshToken,
      {
        EX: 60 * 60 * 24 * 30,
      }
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  /**
   * Refresh Access Token
   */
  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw new Error("Refresh token is required");
    }

    const payload = tokenService.verifyRefreshToken(refreshToken);

    const savedToken = await redis.get(
      `refresh:${payload.id}`
    );

    if (!savedToken) {
      throw new Error("Session expired");
    }

    if (savedToken !== refreshToken) {
      throw new Error("Invalid refresh token");
    }

    const user = await userRepo.findById(payload.id);

    if (!user) {
      throw new Error("User not found");
    }

    const accessToken =
      tokenService.generateAccessToken(user);

    return {
      accessToken,
    };
  }

  /**
   * Logout
   */
  async logout(userId) {
    await redis.del(`refresh:${userId}`);

    return {
      message: "Logged out successfully",
    };
  }

  /**
   * Forgot Password
   */
  async forgotPassword(phone) {
    const user = await userRepo.findByPhone(phone);

    if (!user) {
      throw new Error("User not found");
    }

    const otp = await smsService.sendOtp(phone);

    await redis.set(
      `resetOtp:${phone}`,
      otp.toString(),
      {
        EX: 300,
      }
    );

    return {
      message: "OTP sent successfully",
    };
  }

  /**
   * Verify Reset OTP
   */
  async verifyResetOtp(phone, otp) {
    const savedOtp = await redis.get(
      `resetOtp:${phone}`
    );

    if (!savedOtp) {
      throw new Error("OTP expired");
    }

    if (Number(savedOtp) !== Number(otp)) {
      throw new Error("Invalid OTP");
    }

    const user = await userRepo.findByPhone(phone);

    if (!user) {
      throw new Error("User not found");
    }

    await redis.del(`resetOtp:${phone}`);

    const resetToken =
      tokenService.generateResetToken(user);

    return {
      resetToken,
    };
  }

  /**
   * Reset Password
   */
  async resetPassword(resetToken, newPassword) {
    const payload =
      tokenService.verifyResetToken(resetToken);

    const user = await userRepo.findById(payload.id);

    if (!user) {
      throw new Error("User not found");
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await userRepo.update(user.id, {
      password_hash: hashed,
    });

    await redis.del(`refresh:${user.id}`);

    return {
      message: "Password reset successfully",
    };
  }
}

module.exports = new AuthService();