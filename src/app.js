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
  res.send("Hello World ");
});
app.use("/api/v1/users/", userRouter);

app.use(errorHandler);

export { app };
