import jwt from "jsonwebtoken";

// Function to generate a JWT token and set it as a cookie in the response
const generateToken = (res, userId) => {
  // Generate a JWT token with the payload containing the userId
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Sets the token expiration to 30 days
  });

  // Set the token as a cookie in the response
  res.cookie("jwt", token, {
    httpOnly: true, // Ensures the cookie is only accessible through HTTP requests
    secure: process.env.NODE_ENV !== "development", // Sets the "secure" flag based on the environment
    sameSite: "strict", // Specifies that the cookie should only be sent in same-site requests
    maxAge: 30 * 24 * 60 * 60 * 1000, // Sets the cookie's maximum age to 30 days in milliseconds
  });
};

export default generateToken;
