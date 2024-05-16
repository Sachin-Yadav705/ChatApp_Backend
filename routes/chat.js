import express from "express";

import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  getMyChat,
  getMyGroup,
  newGroupChat,
  removeMember,
} from "../controllers/chat.js";

const app = express.Router();

app.use(isAuthenticated);

app.post("/new", newGroupChat);
app.get("/myChat", getMyChat);
app.get("/myGroups", getMyGroup);

app.put("/addmembers", addMembers);

app.put("/removemember", removeMember);

export default app;
