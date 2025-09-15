import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
} from "../controllers/subscription.controller.js";

const router = Router();

router.use(verifyJwt);

// subscribe / unsubscribe
router.post("/channels/:id/toggle", toggleSubscription);

// get all subscribers of a channel
router.get("/channels/:id/subscribers", getUserChannelSubscribers);

// get all channels a user subscribed to
router.get("/users/:id/subscriptions", getSubscribedChannels);

export default router;
