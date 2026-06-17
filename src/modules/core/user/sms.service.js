const axios = require("axios");

class SmsService {
  async sendOtp(phone, otp) {
    try {
      const response = await axios.post(
        process.env.GEEZ_SMS_URL,
        {
          phone,
          
        },
        {
          headers: {
            "X-GeezSMS-Key": process.env.GEEZ_SMS_TOKEN,
            "Content-Type": "application/json",
          },
        },
      );

    

      return response.data.code;
    } catch (err) {
      console.log("========== GEEZ ERROR ==========");
      console.log("Status:", err.response?.status);
      console.log("Data:", err.response?.data);
      console.log("Message:", err.message);
      console.log("================================");

      throw new Error("Failed to send OTP");
    }
  }
}

module.exports = new SmsService();
