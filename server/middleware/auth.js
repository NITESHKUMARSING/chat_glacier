// import User from "../models/User.js";
// import  jwt from "jsonwebtoken" ;

// // Middleware to protect routes
// export const protectRoute = async (req, res, next)=>{
// try{
// const token = req.headers.token;
// const decoded = jwt.verify(token, process.env.JWT_SECRET)
// const user = await User.findById(decoded.userId).select("-password");
// if(!user) return res.json({success: false ,message:"User not found"});
// req.user = user;
// next();
// } catch (error) {
//     console.log(error.message);
//     res.json({success: false ,message: error.message});
// }}


// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// // Middleware to protect routes
// export const protectRoute = async (req, res, next) => {
//   try {
//     // Get token from headers (standard 'Authorization: Bearer <token>' format)
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ success: false, message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Find user by ID and exclude password
//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // Attach user to request
//     req.user = user;
//     next();

//   } catch (error) {
//     console.log("JWT Error:", error.message);
//     res.status(401).json({ success: false, message: "Unauthorized" });
//   }
// };


// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// export const protectRoute = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     // Check for token
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ success: false, message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     req.user = user;
//     next();

//   } catch (error) {
//     console.log("JWT Error:", error.message);
//     const msg =
//       error.name === "TokenExpiredError"
//         ? "Token expired"
//         : "Unauthorized";
//     res.status(401).json({ success: false, message: msg });
//   }
// // };
// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// export const protectRoute = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     // Check for token
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ success: false, message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("JWT Error:", error.message);
//     const msg =
//       error.name === "TokenExpiredError"
//         ? "Token expired"
//         : "Unauthorized";
//     res.status(401).json({ success: false, message: msg });
//   }
// };
// middleware/auth.js


// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protectRoute = async (req, res, next) => {
//   try {
//     // const token = req.headers.authorization?.split(" ")[1];
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


//     if (!token) {
//       return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res.status(401).json({ success: false, message: "Unauthorized: Invalid user" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.log("Auth Middleware Error:", error.message);
//     return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
//   }
// };


// // middleware/auth.js
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protectRoute = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     // const token = authHeader?.split(" ")[1]; // Get token from "Bearer <token>"
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


//     if (!token) {
//       return res.status(401).json({ success: false, message: "Unauthorized: No token" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select("-password");

//     if (!user) {
//       return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
//   }
// };


// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Extract token from Authorization: Bearer <token>
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }

    // ✅ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Find the user from DB and attach to request
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }

    req.user = user;
    next(); // ✅ Proceed to the next route/controller
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

