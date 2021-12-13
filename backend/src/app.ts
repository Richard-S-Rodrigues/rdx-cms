import "dotenv/config";
import express from "express";
import cookieSession from "cookie-session";
import logger from "morgan";
import cors from "cors";
import { router } from "./routes";

import { JWT_SECRET } from "./config";

const app = express();

app.use(express.json());
app.use(logger("common"));

// Cookie session config
app.use(
  cookieSession({
    name: "session",
    secret: JWT_SECRET,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  })
);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.disable("x-powered-by");
app.use(router);

app.listen(4000, () => console.log("Server running on port 4000"));
