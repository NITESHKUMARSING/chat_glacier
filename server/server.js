import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

//create express app and http server
const app = express();
const server = http.createServer(app);


// Initialize socket.io server
export const io = new Server (server, {
cors: {origin: "*"}
})

// Store online users
export const userSocketMap = {}; // { userId: socketId }

// Socket io connection handler
io.on ("connection", (socket)=>{
const userId = socket.handshake.query.userId;
console.log("User Connected", userId);

if(userId) userSocketMap[userId] = socket.id;

// Emit online users to all connected clients
io.emit("getOnlineUsers", Object.keys(userSocketMap));
socket.on("disconnect", ()=>{
console.log("User Disconnected", userId);
delete userSocketMap[userId];
io.emit ("getOnlineUsers", Object.keys(userSocketMap))

})
1

})
// Middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors({
        origin: "https://chartglacier.netlify.app",
        methods: ["GET", "POST", "DELETE", "PUT"],
        
    }));

// Routes
app.use("/api/status", (req, res) => res.send("server is live"));
app.use("/api/auth", userRouter);         // Correct auth route
app.use("/api/messages", messageRouter); 
// Connect to  mongodb
connectB();


// Port
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// if(process.env.NODE_ENV !== "production"){
// const PORT = process.env.PORT || 5000;
// sjerver. listen (PORT, ()=> console.log("Server is running on PORT: " + PORT))

// Export server for VervelI
//export default server;
