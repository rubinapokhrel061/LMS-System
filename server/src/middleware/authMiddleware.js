import jwt from "jsonwebtoken";
import User from "../database/models/userModel.js";
export const role = {
  Student: "student",
  Instructor: "instructor",
};
class AuthMiddleware {
  async isAuthenticated(req, res, next) {
    //get token from user
    const token = await req?.headers?.authorization;
    if (!token || token === undefined) {
      res.status(403).json({
        message: "Token not provided",
      });
      return;
    }
    // verify token if it. it is legit or tampered
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        res.status(403).json({
          message: "Invalid Token",
        });
      } else {
        // check if that decoded object id user exist or not
        try {
          const userData = await User.findByPk(decoded.id);
          if (!userData) {
            res.status(404).json({
              message: "No user with that token",
            });
            return;
          }
          req.user = userData;
          next();
        } catch (error) {
          res.status(500).json({
            message: "Something went wrong",
          });
        }
      }
    });
  }

  //check role customer and admin ma yeuta xa ki naii
  restrictTo(...roles) {
    return (req, res, next) => {
      let userRole = req.user?.role;
      if (!roles.includes(userRole)) {
        res.status(403).json({
          message: "you don't have permission",
        });
      } else {
        next();
      }
    };
  }
}
export default new AuthMiddleware();
