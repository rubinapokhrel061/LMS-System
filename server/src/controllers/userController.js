//userController
import User from "../database/models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const [data] = await User.findAll({
      where: {
        email: email,
      },
    });

    if (data) {
      res.status(400).json({
        message: "Email is already taken by another user",
      });
      return;
    }
    await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
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
    const token = jwt.sign({ id: data.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({
      message: "Logged in sucessfully",
      data: token,
      user: data,
    });
  }

  static async updateUser(req, res) {
    const { id, username, email, password } = req.body;
    if (!id) {
      res.status(400).json({
        message: "Please provide User ID",
      });
      return;
    }
    if (!username) {
      res.status(400).json({
        message: "Please provide User Name",
      });
      return;
    }
    if (!email) {
      res.status(400).json({
        message: "Please provide User email",
      });
      return;
    }
    const existingUser = await User.findByPk(id);
    if (!existingUser) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }
    // Check if the new email already exists in the system (if it's being updated)
    if (existingUser.email !== email) {
      const emailExists = await User.findOne({
        where: {
          email,
        },
      });
      if (emailExists) {
        res.status(400).json({
          message: "Email is already taken by another user",
        });
        return;
      }
    }

    // Prepare the data to update
    const updatedData = {
      username,
      email,
      role,
    };

    // Only update the password if provided
    if (password) {
      updatedData.password = bcrypt.hashSync(req.body.password, 12);
    }
    // Update the user in the database
    await User.update(updatedData, {
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "User updated successfully",
    });
  }
}

export default AuthController;
