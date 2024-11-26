//userController
import User from "../database/models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  static async registerUser(req, res) {
    const { username, email, password, role } = req.body;
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
    const [data] = await User.findAll({
      where: {
        email: email,
      },
    });

    if (data) {
      res.status(400).json({
        message: " User already exist with that email",
      });
      return;
    }
    await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
      role,
    });
    res.status(200).json({
      message: "User Registered Successfully..",
    });
  }
  static async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Please provide email & password",
      });
      return;
    }
    const [data] = await User.findAll({
      where: {
        email: email,
      },
    });

    if (!data) {
      res.status(400).json({
        message: "No user with that email",
      });
      return;
    }
    //  //check password now
    // password-> check garne password and data.password->database ma vako password

    const isMAtched = bcrypt.compareSync(password, data.password);
    if (!isMAtched) {
      req.status(403).json({
        message: "Invalid email or password",
      });
      return;
    }
    const token = jwt.sign({ id: data.id }, "lms", {
      expiresIn: "1d",
    });
    res.status(200).json({
      message: "Logged in sucessfully",
      data: token,
    });
  }
}

export default AuthController;
