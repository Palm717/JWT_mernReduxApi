import mongoose from "mongoose";

// create mongo Schema
const userSchema = mongoose.Schema({
  name: {
    type: String, // name is a String and is required
    required: true,
  },
  email: {
    type: String, // email is a String and required and must be unique
    required: true,
    unique: true,
  },
  password: {
    type: String, // password will be hashed but is still a string and is required
    required: true,
  },
});
