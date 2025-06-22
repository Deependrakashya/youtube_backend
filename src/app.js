import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/error_handler.js";
const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin); // allow any origin
    },
    credentials: true,
  })
);

// configrations

app.use(express.json({ limit: "16kb" }));
// allow to url
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// allow to share data from public folder
app.use(express.static("public"));
// conf for  cookie for CRUD on user browser
app.use(cookieParser());

// routes import

import userRouter from "./routes/user.route.js";

// route declaration
app.get("/", (req, res) => {
  res.send(`<div>
    <h1> Hey There 👋🏻 !! </h1>
    <h5>welcome to the my first Rest Api Project </h5>
  <p>Use URL: <a href="https://youtube-backend-mu0n.onrender.com/api/v1/user" target="_blank">
      https://youtube-backend-mu0n.onrender.com/api/v1/user
    </a> for sending requests.</p> </div>`);
});
app.use("/api/v1/users/", userRouter);

app.use(errorHandler);

export { app };
