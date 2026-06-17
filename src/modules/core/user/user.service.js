console.log("===== USER SERVICE LOADED =====");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const redis = require("./redis");
const userRepo = require("./user.repository");
const smsService = require("./sms.service");

class UserService {


  async register(data) {
  const existing = await userRepo.findByPhone(data.phone);

  if (existing) {
    throw new Error("User already exists");
  }

  const hashed = await bcrypt.hash(data.password, 10);

  const user = await userRepo.create({
    ...data,
    password_hash: hashed,
    status: "PENDING",
  });

  // ✅ OTP comes from GEEZ
  const otp = await smsService.sendOtp(user.phone);

  console.log("OTP:", otp);
  await redis.set(`otp:${user.phone}`, otp.toString(), {
    EX: 300,
  });
  

  return {
    message: "OTP sent successfully",
    phone: user.phone,
  };
}

  async verifyPhone(phone, otp) {
  const savedOtp = await redis.get(`otp:${phone}`);

  if (!savedOtp) {
    throw new Error("OTP expired");
  }

  if (Number(savedOtp) !== Number(otp.toString())) {
    throw new Error("Invalid OTP");
  }

  const user = await userRepo.findByPhone(phone);

  if (!user) {
    throw new Error("User not found");
  }

  await userRepo.update(user.id, {
    status: "ACTIVE",
  });

  await redis.del(`otp:${phone}`);

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    message: "Phone verified successfully",
    user,
    token,
  };
}

  async resendOtp(phone) {
  const user = await userRepo.findByPhone(phone);

  if (!user) {
    throw new Error("User not found");
  }

  const otp = await smsService.sendOtp(phone);

  await redis.set(`otp:${phone}`, otp.toString(), {
    EX: 300,
  });

  return {
    message: "OTP resent successfully",
  };
}

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

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { user, token };
  }

  async getAll() {
    return await userRepo.findAll();
  }

  async getById(id) {
    return await userRepo.findById(id);
  }

  async update(id, data) {
    return await userRepo.update(id, data);
  }

  async delete(id) {
    return await userRepo.delete(id);
  }
}

module.exports = new UserService();