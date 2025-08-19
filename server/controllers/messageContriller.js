// import Message from "../models/Message.js"
// import User from "../models/User.js";
// import cloudinary from "../lib/cloudinary.js"
// import { io ,userSocketMap} from "../server.js";
// // Get all users except the logged in user
// export const getUsersForSidebar = async (req, res)=>{
// try {
// const userId = req.user._id;
// const filteredUsers = await User.find({_id: {$ne: userId}}).select
// ("-password");

// // Count number of messages not seen
// const unseenMessages = {}
// const promises = filteredUsers.map(async (user)=>{
// const messages = await Message.find({senderId:user._id, receverId:userId , seen:false})
// if(messages.length>0){
//     unseenMessages[user._id]= messages.length;
// }
// })
// await promises.all(promises);
// res.json({success:true , users:filteredUsers,unseenMessages})
//  } catch
// (error) {
//     console.log(error.messages)
//     res.json({success:false , messages:error.messages})

// }}





// // Get all messages for selected user
// export const getMessages = async (req, res) =>{
// try {
// const { id: selectedUserId } = req.params;
// const myId = req.user._id;

// const messages = await Message.find({
// $or:[

//     {senderId: myId, receiverId: selectedUserId}, 
//     {senderId: selectedUserId, receiverId: myId},
// ]
// })

// await Message.updateMany({senderId: selectedUserId, receiverId: myId}, {seen:true});
// res.json({success: true, messages})

// }
// catch (error) {
//     console.log(error.message);
// res. json({success: false, message: error.message})}}



// // api to mark message as seen using message id
// export const markMessageAsSeen = async (req, res)=>{
// try {
// const { id } = req.params;
// await Message.findByIdAndUpdate(id, {seen: true})
// res. json ({success: true})
// } catch (error) {
// console.log(error.message);
// res. json ({success: false, message: error.message})}}




// // 3:30

// // Send message to selected user
// export const sendMessage = async (req, res) =>{
// try {
// const {text, image} = req. body;
// const receiveria = req.params.id;
// const senderId = req.user._id;

// let imageUrl;
// if(image){
//     const uploadResponse = await cloudinary.uploader.upload(image)
//     imageUrl = uploadResponse.secure_url
// }
// const newMessage = await Message.create({
//     senderId ,
//     receiveria,
//     text,
//     image: imageUrl
// })
// // Emit the new message to the receiver's pocket
// const receiverSocketId = userSocketMap[receiverId];
// if (receiverSocketId){
// io.to(receiverSocketId).emit("newMessage", newMessage)
// }

// res.json({success:true, newMessage})
// } catch (error) {
// console. log(error.message);
// res. json ({success: false, message: error.message})}}



// import Message from "../models/Message.js";
// import User from "../models/User.js";
// import cloudinary from "../lib/cloudinary.js";
// import { io, userSocketMap } from "../server.js";

// // Get all users except the logged in user
// export const getUsersForSidebar = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");

//     // Count number of unseen messages
//     const unseenMessages = {};
//     const promises = filteredUsers.map(async (user) => {
//       const messages = await Message.find({
//         senderId: user._id,
//         receverId: userId,
//         seen: false,
//       });
//       if (messages.length > 0) {
//         unseenMessages[user._id] = messages.length;
//       }
//     });

//     await Promise.all(promises); // ✅ Fixed

//     res.json({ success: true, users: filteredUsers, unseenMessages });
//   } catch (error) {
//     console.log(error.message); // ✅ Fixed
//     res.json({ success: false, message: error.message }); // ✅ Fixed
//   }
// };

// // Get all messages for selected user
// export const getMessages = async (req, res) => {
//   try {
//     const { id: selectedUserId } = req.params;
//     const myId = req.user._id;

//     const messages = await Message.find({
//       $or: [
//         { senderId: myId, receverId: selectedUserId },
//         { senderId: selectedUserId, receverId: myId },
//       ],
//     });

//     // Mark as seen
//     await Message.updateMany(
//       { senderId: selectedUserId, receverId: myId },
//       { seen: true }
//     );

//     res.json({ success: true, messages });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Mark a message as seen
// export const markMessageAsSeen = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Message.findByIdAndUpdate(id, { seen: true });
//     res.json({ success: true });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// // Send message to selected user
// export const sendMessage = async (req, res) => {
//   try {
//     const { text, image } = req.body;
//     const receiverId = req.params.id; // ✅ fixed from receiveria
//     const senderId = req.user._id;

//     let imageUrl;
//     if (image) {
//       const uploadResponse = await cloudinary.uploader.upload(image);
//       imageUrl = uploadResponse.secure_url;
//     }

//     const newMessage = await Message.create({
//       senderId,
//       receverId: receiverId, // ✅ corrected key
//       text,
//       image: imageUrl,
//     });

//     // Emit to the receiver's socket
//     const receiverSocketId = userSocketMap[receiverId];
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     res.json({ success: true, newMessage });
//   } catch (error) {
//     console.log(error.message);
//     res.json({ success: false, message: error.message });
//   }
// };



import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { io, userSocketMap } from "../server.js";

// Get all users except the logged-in user
export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");

    // Count number of unseen messages
    const unseenMessages = {};
    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId, // ✅ fixed typo
        seen: false,
      });

      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });

    await Promise.all(promises);

    res.json({ success: true, users: filteredUsers, unseenMessages });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get all messages between logged-in user and selected user
export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: selectedUserId },   // ✅ fixed
        { senderId: selectedUserId, receiverId: myId },   // ✅ fixed
      ],
    }).sort({ createdAt: 1 });

    // Mark messages as seen
    await Message.updateMany(
      { senderId: selectedUserId, receiverId: myId },    // ✅ fixed
      { seen: true }
    );

    res.json({ success: true, messages });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Mark a specific message as seen
export const markMessageAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndUpdate(id, { seen: true });
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Send a message (text or image) to a specific user
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,  // ✅ fixed typo
      text,
      image: imageUrl,
    });

    // Emit the new message to the receiver if online
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.json({ success: true, newMessage });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};
