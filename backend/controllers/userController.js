import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc auth user/set token
// route POST /api/users/auth
// @acess Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // checks if email and password match
    // generate a token and set it as a cookie in the res obj
    generateToken(res, user._id);
    res.status(201).json({
      // a good code showing creation
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register new user
// route POST /api/users
// @acess Public

// when registering a user it is similar to creating a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email }); // looking for a user by email

  if (userExists) {
    res.status(400);
    throw new Error("User already exists"); // uses default error handler from middleware folder
  }

  const user = await User.create({
    name,
    email,
    password, // add hook before saving pass to hash using bcrypt
  });

  if (user) {
    // generate a token and set it as a cookie in the res obj
    generateToken(res, user._id);
    res.status(201).json({
      // a good code showing creation
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Error");
  }
});

// @desc Logout User
// route POST /api/users/logout
// @acess Public

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    // name the cookie (<any>) then pass an empty string
    httpOnly: true,
    expires: new Date(0), // expires immediately
  });

  res.status(200).json({ msg: "User logged out" });
});

// @desc Get user profile
// route GET /api/users/profile
// @acess Private

const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: " User Profile" });
});

// @desc Get user profile
// route PUT /api/users/profile
// @acess Private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "  Update User Profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
