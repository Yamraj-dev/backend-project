import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { addComment, deleteComment, getVideoComments, updateComment } from "../controllers/comment.controller.js";


const router = Router();

router.use(verifyJwt);

router.post("/:id", addComment);

router.get("/video/:id", getVideoComments);

router.put("/:id", updateComment);

router.delete("/:id", deleteComment);

export default router;

