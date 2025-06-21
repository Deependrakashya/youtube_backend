import { Router } from "express";
import {
  changeCurrentUserPassword,
  getCurrentUser,
  getUserChannelProfile,
  getUserWatchHistory,
  logInUser,
  logOutUser,
  refereshAccessToken,
  registerUser,
  updateAvatar,
  updateCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(logInUser);
//secure
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/refresh-token").post(refereshAccessToken);
router.route("/update-password").post(verifyJWT, changeCurrentUserPassword);
router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateAvatar);
router
  .route("/update-coverimage")
  .patch(verifyJWT, upload.single("coverImage"), updateCoverImage);

router.get("/channel/:username", getUserChannelProfile);
router.get("/getuser", verifyJWT, getCurrentUser);
router.get("/history", verifyJWT, getUserWatchHistory);

export default router;
