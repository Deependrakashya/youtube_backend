import { Router } from "express";
import {
  changeCurrentUserPassword,
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
  .post(
    verifyJWT,
    upload.single('avatar'),
    updateAvatar
  );
router
  .route("/update-coverimage")
  .post(
    verifyJWT,
    upload.single('coverImage'),
    updateCoverImage
  );

export default router;
