import asyncHandler from "express-async-handler";

// @desc auth user/set token
// route POST /api/users/auth
// @acess Public

const authUser = asyncHandler((req, res) => {
  res.status(200).json({ msg: "Auth User" });
});

// @desc Register new user
// route POST /api/users
// @acess Public

const registerUser = asyncHandler((req, res) => {
  res.status(200).json({ msg: "Register User" });
});

// @desc Logout User
// route POST /api/users/logout
// @acess Public

const logoutUser = asyncHandler((req, res) => {
  res.status(200).json({ msg: "Logout User" });
});

// @desc Get user profile
// route GET /api/users/profile
// @acess Private

const getUserProfile = asyncHandler((req, res) => {
  res.status(200).json({ msg: " User Profile" });
});

// @desc Get user profile
// route PUT /api/users/profile
// @acess Private

const updateUserProfile = asyncHandler((req, res) => {
  res.status(200).json({ msg: "  Update User Profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
