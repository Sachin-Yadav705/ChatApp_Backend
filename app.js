import express from "express";
import UserRouter from "./routes/user.js";
import ChatRouter from "./routes/chat.js";

import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { createUser } from "./seeders/user.js";

dotenv.config({
  path: "./.env",
});
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

connectDB(mongoUri);

// createUser(10);

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user", UserRouter);
app.use("/chat", ChatRouter);

app.get("/", (req, res) => {
  res.send("Hello Worls");
});

app.use(errorMiddleware);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
