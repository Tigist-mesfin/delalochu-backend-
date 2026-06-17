const userService = require("./user.service");
const { registerUser, loginUser,  verifyOtpSchema, resendOtpSchema, } = require("./user.validation");

class UserController {
  async register(req, res) {
    try {
      const { error } = registerUser.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });

      const user = await userService.register(req.body);

      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

   async verifyPhone(req, res) {
    try {
      const { error } = verifyOtpSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const { phone, otp } = req.body;

      const result = await userService.verifyPhone(phone, otp);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  async resendOtp(req, res) {
    try {
      const { error } = resendOtpSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const { phone } = req.body;

      const result = await userService.resendOtp(phone);

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }


  async login(req, res) {
    try {
      const { error } = loginUser.validate(req.body);
      if (error) return res.status(400).json({ message: error.message });

      const { phone, password } = req.body;

      const result = await userService.login(phone, password);

      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  

  async getAll(req, res) {
    const users = await userService.getAll();
    res.json(users);
  }

  async getById(req, res) {
    const user = await userService.getById(req.params.id);
    res.json(user);
  }

  async update(req, res) {
    await userService.update(req.params.id, req.body);
    res.json({ message: "Updated successfully" });
  }

  async delete(req, res) {
    await userService.delete(req.params.id);
    res.json({ message: "Deleted successfully" });
  }
}

module.exports = new UserController();