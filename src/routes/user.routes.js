import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  logedInUser,
  logOutUser,
  refreshAccessToken,
  registerUser,
  UpdateAvatar,
  UpdateCoverImage,
  updateFullName,
  updateUserName,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", upload.fields([
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

router.post("/login", logedInUser);

//secured routes

router.post("/logout", verifyJwt, logOutUser);
router.post("/refresh-token", verifyJwt, refreshAccessToken);
router.post("/watch-history", verifyJwt, getWatchHistory);
router.post("/userChannelProfile/:id", verifyJwt, getUserChannelProfile);

router.get("/current-user", verifyJwt, getCurrentUser);

router.put("/update-password", verifyJwt, changeCurrentPassword);
router.put("/update-name", verifyJwt, updateUserName);
router.put("/update-fullname", verifyJwt, updateFullName);
router.put("/update-avatar", verifyJwt, upload.single("avatar"), UpdateAvatar);
router.put("/update-coverImage", verifyJwt, upload.single("coverImage"), UpdateCoverImage);

export default router;