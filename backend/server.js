//packages to be used for backend build
import express from "express"; // express routing package
import dotenv from "dotenv"; // enviornment package
dotenv.config(); // run the enviornment function
import cookieParser from "cookie-parser";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; // created error handling from middlewar folder

// mongoose connection to connect server and mongoDB together
import connectDB from "./config/db.js";

// PORT to run dev server on
const PORT = process.env.PORT || 5000;

// routes from routes folder
import userRoutes from "./routes/userRoutes.js";

// run mongoose connection
connectDB();

// set express to app
const app = express();

// these allow raw data of json to be sent and to use form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// use express application to initiate browser routes
app.use("/api/users", userRoutes);

// create route from server to browser
app.get("/", (req, res) => {
  res.send(`Server is ready`);
});

// run error middleware
app.use(notFound);
app.use(errorHandler);

// make sure server is listening on specified localhost PORT
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
