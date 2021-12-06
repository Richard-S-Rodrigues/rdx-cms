import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000" }));
app.disable("x-powered-by");
app.use(router);

app.listen(4000, () => console.log("Server running on port 4000"));
