import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  // grab the jwt token from the "jwt" cookie in the request -- must have same name from cookie in controller
  if (token) {
    try {
      // verify and decode token using JWT_SECRET from dotenv
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // find user with matching userId from decoded token
      req.user = await User.findById(decoded.userId).select("-password"); // make sure the password is not decoded in the process and retrieved

      // send in middleware functions
      next();
    } catch (err) {
      res.status(401);
      throw new Error(`Not authorized, invalid token`);
    }
  } else {
    res.status(401);
    throw new Error(`Not authorized, no token`);
  }
});

export { protect };
