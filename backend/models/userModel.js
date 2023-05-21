import mongoose from "mongoose";
import bcrypt from "bcrypt";

// create mongo Schema
const userSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // before saving if the password is already modified then run the next function in userCreate
    next();
  }

  // create salt on a users password before creating the user for the DB
  const salt = await bcrypt.genSalt(10); // 10 rounds of salt
  this.password = await bcrypt.hash(this.password, salt); // give this password from the user a hashed pass for the DB
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}; // compares the user entered password with the hashed password

// ensure that both passwords match without revealing any other information

const User = mongoose.model("User", userSchema);

export default User;
