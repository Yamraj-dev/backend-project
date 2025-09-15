import { Router } from "express";
import {
    createPlaylist,
    PlaylistById,
    editPlaylist,
    deletePlaylist,
} from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, createPlaylist);

router.get("/:id", verifyJWT, PlaylistById);

router.put("/:id", verifyJWT, editPlaylist);

router.delete("/:id", verifyJWT, deletePlaylist);

export default router;
