// import express from "express";
// import { protectRoute } from "../middleware/auth.js";
// import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from"../controllers/messageContriller.js";

// const messageRouter = express. Router();

// messageRouter.get("/users", protectRoute, getUsersForSidebar); 
// messageRouter.get("/:id", protectRoute, getMessages); 
// messageRouter.put ("mark/:id", protectRoute, markMessageAsSeen);
// messageRouter.post("/send/:id",protectRoute,sendMessage)
// export default messageRouter;


import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  getMessages,
  getUsersForSidebar,
  markMessageAsSeen,
  sendMessage,
} from "../controllers/messageContriller.js"; // ✅ FIXED typo

const messageRouter = express.Router(); // ✅ FIXED: Remove space in `express.Router()`

// Routes
messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("/mark/:id", protectRoute, markMessageAsSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;
