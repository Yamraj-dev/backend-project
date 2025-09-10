import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(cookieParser());

// routes import

import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.route.js";

// routes declaration

app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);

// health check route
app.get("/api/v1/healthCheck", (req, res) => {
  return res.send("Wellcome to the server");
})

export default app;
