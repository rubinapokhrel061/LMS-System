import User from "../database/models/userModel.js";
class AuthController {
  static async registerUser(req, res) {
    const { username, email, password } = req.body;
    if (!username) {
      res.status(400).json({
        message: "Please provide UserName..",
      });
      return;
    }
    if (!email) {
      res.status(400).json({
        message: "Please provide email..",
      });
      return;
    }
    if (!password) {
      res.status(400).json({
        message: "Please provide password..",
      });
      return;
    }
    await User.create({
      username,
      email,
      password,
    });
    res.status(200).json({
      message: "User Registered Successfully..",
    });
  }
}

export default AuthController;
