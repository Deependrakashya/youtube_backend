import jwt from "jsonwebtoken";
import { ApiErrors } from "../utils/api_errors.js";
import { asyncHandler } from "../utils/async_handler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookie?.accessToken ||
      req.header("Authrization")?.replaceAll("Bearer ", "");
    if (!token) {
      throw new ApiErrors(401, "unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiErrors(401, "Invalid Access Token ");
    }
    req.user = user;
    next();
  } catch (error) {
   throw new ApiErrors(401,error?.message || "Invalid Access Token"
   )
  }
});
