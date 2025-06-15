import { asyncHandler } from "../utils/async_handler.js";
import { ApiErrors } from "../utils/api_errors.js";
import { User } from "../models/user.model.js";
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/api_response.js";
const registerUser = asyncHandler(async (req, res) => {
  //get details of user from frontend
  // validation -- not empty and trim
  // if user exists : email ,username
  // check for images , check for avatar
  // upload to cloudinary avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // reutrn res
  const { fullName, email, username, password } = req.body;
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiErrors(400, "All field are required !");
  }
  const existsUser =await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existsUser) {
    throw new ApiErrors(409, "user with email or username already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiErrors(400, "Avatar Image is required ");
  }
  const avatar = await uploadFileOnCloudinary(avatarLocalPath);
  const coverImage = await uploadFileOnCloudinary(coverImageLocalPath);
  console.log("avatar cloudinary : ", avatar);
  console.log("coverImage cloudinary : ", coverImage);

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });
  const createdUser =await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiErrors(500, "Error while creating user");
  }

return res.status(201).json(
  new ApiResponse(200, createdUser, "User registered successfully!")
);
});

export { registerUser };
