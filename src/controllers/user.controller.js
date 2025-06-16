import { asyncHandler } from "../utils/async_handler.js";
import { ApiErrors } from "../utils/api_errors.js";
import { User } from "../models/user.model.js";
import { uploadFileOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/api_response.js";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async (userId) => {


  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiErrors(404, "User not found");
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.accesToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Failed to generate tokens:", error);
    throw new ApiErrors(500, "Failed to generate tokens", error);
  }
};

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
  const existsUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existsUser) {
    throw new ApiErrors(409, "user with email or username already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (req.files.coverImage != null) {
    var coverImageLocalPath = req.files?.coverImage[0]?.path;
  }
  // console.log("req.files?.avatar[0]? : ", req.files?.avatar[0]);

  if (!avatarLocalPath) {
    throw new ApiErrors(400, "Avatar Image is required ");
  }
  const avatar = await uploadFileOnCloudinary(avatarLocalPath);
  const coverImage = await uploadFileOnCloudinary(coverImageLocalPath);
  // console.log("coverImage cloudinary : ", coverImage);

  const user = new User({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  await user.save(); // ✅ ensures pre-save runs

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiErrors(500, "Error while creating user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully!"));
});

const logInUser = asyncHandler(async (req, res) => {
  // get details from req
  // username or email
  // find the user
  // password check
  // access and refresh token
  // send cookie
  const { email, username, password } = req.body;

  // console.log(email);

  if (!(username || email)) {
    throw new ApiErrors(400, "username or email is required ");
  }
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    throw new ApiErrors(404, "User does not exits");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiErrors(401, "Invalid User Credentials ");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user);

  const loggedInUser = await User.findById(user._id).select("-refreshToken -password");

  // for secuirty so that cookies should not be modifiable
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "user LoggedIn Succefully"
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged Out successfully"));
});

const refereshAccessToken = asyncHandler(async (req, res) => {
  const incomingrefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingrefreshToken) {
    throw new ApiErrors(401, "unauthorised Access");
  }
  try {
    const decodeToken = jwt.verify(
      incomingrefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodeToken?._id);
    if (!user) {
      throw new ApiErrors(401, "invalid refresh token ");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newrefreshToken } =
      await generateAccessTokenAndRefreshToken(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, newrefreshToken },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiErrors(
      400,
      error?.message || "refresh token could not generated "
    );
  }
});

export { registerUser, logInUser, logOutUser, refereshAccessToken };
