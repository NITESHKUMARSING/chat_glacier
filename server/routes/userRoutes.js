// import express from "express"
// import { checkAuth, login, signup, updateProfile } from "../controllers/userController.js"
// import { protectRoute } from"../middleware/auth.js";

// const userRouter = express.Router();
// userRouter.post("/signup", signup); 
// userRouter.post("/login", login);
// userRouter.put("/update-profile", protectRoute, updateProfile); 
// userRouter.get("/check", protectRoute,checkAuth);

// export default userRouter;


import express from "express";
import {
  checkAuth,
  login,
  signup,
  updateProfile,
} from "../controllers/userController.js";

import { protectRoute } from "../middleware/auth.js"; // ❌ FIX: missing space or wrong quote before "../middleware"

const userRouter = express.Router();

// Public routes
userRouter.post("/signup", signup); 
userRouter.post("/login", login);

// Protected routes
userRouter.put("/update-profile", protectRoute, updateProfile); 
userRouter.get("/check", protectRoute, checkAuth);

export default userRouter;
