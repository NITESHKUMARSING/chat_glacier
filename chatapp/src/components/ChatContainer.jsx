// import React, { useEffect, useRef, useState } from "react";
// import assets, { messagesDummyData } from "../assets/assets";
// import { formatMessageTime } from "../lib/utils";

// const ChatContainer = ({ selectedUser, setSelectedUser }) => {
//   const scrollEnd = useRef();

//   useEffect(() => {
//     if (scrollEnd.current) {
//       scrollEnd.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, []);
//   return selectedUser ? (
//     <div className="h-full overflow-scroll relative backdrop-blur-lg">
//       {/* Header */}
//       <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
//         <img
//           src={assets.profile_martin}
//           alt="profile"
//           className="w-8 rounded-full"
//         />
//         <p className="flex-1 text-lg text-white flex items-center gap-2">
//           Martin Johnson
//           <span className="w-2 h-2 rounded-full bg-green-500"></span>
//         </p>
//         <img
//           onClick={() => setSelectedUser(null)}
//           src={assets.arrow_icon}
//           alt="back"
//           className="md:hidden w-7 cursor-pointer"
//         />
//         <img
//           src={assets.help_icon}
//           alt="help"
//           className="max-md:hidden w-5 cursor-pointer"
//         />
//       </div>

//       {/* Chat Area */}
//       <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6 gap-4">
//         {messagesDummyData.map((msg, index) => {
//           const isOwn = msg.senderId === "680f50e4f10f3cd28382ecf9";
//           return (
//             <div
//               key={index}
//               className={`flex items-end gap-2 ${
//                 isOwn ? "justify-end" : "justify-start flex-row-reverse"
//               }`}
//             >
//               {msg.image ? (
//                 <img
//                   src={msg.image}
//                   alt="chat"
//                   className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-1"
//                 />
//               ) : (
//                 <p
//                   className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-1 break-all bg-violet-500/30 text-white ${
//                     isOwn ? "rounded-br-none" : "rounded-bl-none"
//                   }`}
//                 >
//                   {msg.text}
//                 </p>
//               )}

//               {/* Sender avatar and timestamp */}
//               <div className="text-center text-xs flex flex-col items-center">
//                 <img
//                   src={isOwn ? assets.avatar_icon : assets.profile_martin}
//                   alt="avatar"
//                   className="w-7 h-7 rounded-full"
//                 />
//                 <p className="text-gray-500 mt-0.5">
//                   {formatMessageTime(msg.createdAt)}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//         <div ref={scrollEnd}></div>
//       </div>
//     </div>
//   ) : (
//     <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden h-full w-full">
//       <img src={assets.logo_icon} alt="logo" className="w-16" />
//       <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
//     </div>
//   );
// };

// export default ChatContainer;

//

// import React, { useContext, useEffect, useRef, useState } from "react";
// import assets, { messagesDummyData } from "../assets/assets";
// import { formatMessageTime } from "../lib/utils";
// import { ChatContext } from "../../context/ChatContext";
// import { AuthContext } from "../../context/AuthContext";

// const ChatContainer = () => {
//   const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
//     useContext(ChatContext);
//   const { authUser, onlineUsers } = useContext(AuthContext);
//   const scrollEnd = useRef();

//   const [input, setInput] = useState("");

//   // Handle sending message

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (input.trim() === "") return null;
//     await sendMessage({ text: input.trim() });
//     setInput("");
//   };

//   // Handle sending an image
//   // const handleSendImage = async (e) =>{
//   // const file = e.target.files[0];
//   // if(!file || !file.type.startsWith("image/")){
//   // toast.error("select an image file")
//   // return;
//   // }
//   // const reader = new FileReader();
//   // reader.onloadend = async ()=>{
//   // await sendMessage({image: reader.result})
//   // e.target.value = ""
//   // }
//   // reader.readAsDataURL(file)

//   // }

//   // Handle sending an image
//   const handleSendImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file || !file.type.startsWith("image/")) {
//       toast.error("select an image file");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       await sendMessage({ image: reader.result });
//       e.target.value = ""; // ❗ fix: moved inside async function
//     };
//     reader.readAsDataURL(file);
//   };

//   useEffect(() => {
//     if (selectedUser) {
//       getMessages(selectedUser._id);
//     }
//   }, [selectedUser]);
//   useEffect(() => {
//     if (scrollEnd.current && messages) {
//       scrollEnd.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]); // Scroll on new messages

//   return selectedUser ? (
//     <div className="h-full overflow-scroll relative backdrop-blur-lg">
//       {/* Header */}
//       <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
//         <img
//           src={selectedUser.profilePic || assets.avatar_icon}
//           alt="profile"
//           className="w-8 rounded-full"
//         />
//         <p className="flex-1 text-lg text-white flex items-center gap-2">
//           {selectedUser.fullName}
//           {onlineUsers.includes(selectedUser._id)}
//           <span className="w-2 h-2 rounded-full bg-green-500"></span>
//         </p>
//         <img
//           onClick={() => setSelectedUser(null)}
//           src={assets.arrow_icon}
//           alt="back"
//           className="md:hidden w-7 cursor-pointer"
//         />
//         <img
//           src={assets.help_icon}
//           alt="help"
//           className="max-md:hidden w-5 cursor-pointer"
//         />
//       </div>

//       {/* Chat Area */}
//       <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6 gap-4">
//         {messages.map((msg, index) => {
//           msg.senderId === authUser._id;
//           return (
//             <div
//               key={index}
//               className={`flex items-end gap-2 ${
//                 authUser._id ? "justify-end" : "justify-start"
//               }`}
//             >
//               {!authUser._id && (
//                 <img
//                   src={assets.profile_martin}
//                   alt="avatar"
//                   className="w-7 h-7 rounded-full"
//                 />
//               )}

//               {/* Message Content */}
//               <div
//                 className={`flex flex-col items-start max-w-[250px] ${
//                   authUser._id ? "items-end" : "items-start"
//                 }`}
//               >
//                 {msg.image ? (
//                   <img
//                     src={msg.image}
//                     alt="chat"
//                     className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-1"
//                   />
//                 ) : (
//                   <p
//                     className={`p-2 text-sm font-light rounded-lg mb-1 break-words bg-violet-500/30 text-white ${
//                       authUser._id ? "rounded-br-none" : "rounded-bl-none"
//                     }`}
//                   >
//                     {msg.text}
//                   </p>
//                 )}
//                 <p className="text-gray-500 text-xs">
//                   {formatMessageTime(msg.createdAt)}
//                 </p>
//               </div>

//               {authUser._id && (
//                 <img
//                   src={
//                     authUser.profilePic
//                       ? authUser?.profilePic || assets.avatar_icon
//                       : selectedUser?.profilePic || assets.avatar_icon
//                   }
//                   alt="avatar"
//                   className="w-7 h-7 rounded-full"
//                 />
//               )}
//             </div>
//           );
//         })}
//         <div ref={scrollEnd}></div>
//       </div>

//       {/* ..............button area ........... */}

//       {/* <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
//         <div>
//           <input type="text" placeholder="Send a message " />
//           <input
//             type="file"
//             id="image"
//             accept="image/png , image/jpeg , image/heic , image/dng "
//             hidden
//           />
//           <label htmlFor="image">
//             <img
//               src={assets.gallery_icon}
//               alt=""
//               className="w-5 mr-2 cursor-pointer"
//             />
//           </label>
//         </div>
//         <img src={assets.send_button} alt="" className="w-7 cursor-pointer" />
//       </div> */}

//       {/* extra iphone */}
//       <div className="absolute bottom-0 left-0 right-0 px-4 py-3  flex items-center gap-3 border-t border-white/0">
//         {/* Input box with file and text */}
//         <div className="flex items-center bg-white/20 rounded-full px-4 py-2 flex-1 gap-3 shadow-sm border border-white/30 backdrop-blur-lg">
//           {/* Gallery Icon */}
//           <label htmlFor="image" className="cursor-pointer">
//             <img
//               src={assets.gallery_icon}
//               alt="gallery"
//               className="w-5 opacity-80 hover:opacity-100"
//             />
//           </label>
//           <input
//             onChange={handleSendImage}
//             type="file"
//             id="image"
//             accept="image/png, image/jpeg, image/heic, image/dng"
//             hidden
//           />

//           {/* Text input */}
//           <input
//             onChange={(e) => setInput(e.target.value)}
//             value={input}
//             onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
//             type="text"
//             placeholder="iMessage..."
//             className="bg-transparent text-sm text-white flex-1 outline-none placeholder:text-white/50"
//           />
//         </div>

//         {/* Send Button */}
//         <img
//           onClick={handleSendMessage}
//           src={assets.send_button}
//           alt="send"
//           className="w-8 h-8 p-1.5 bg-violet-600 rounded-full shadow-md cursor-pointer hover:scale-105 transition"
//         />
//       </div>
//       {/* extra ends */}
//     </div>
//   ) : (
//     <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden h-full w-full">
//       <img src={assets.logo_icon} alt="logo" className="w-16" />
//       <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
//     </div>
//   );
// };

// export default ChatContainer;

import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const scrollEnd = useRef();

  const [input, setInput] = useState("");

  // Handle sending text message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendMessage({
      text: input.trim(),
      receiverId: selectedUser._id, // ✅ FIXED
    });
    setInput("");
  };

  // Handle sending an image
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({
        image: reader.result,
        receiverId: selectedUser._id, // ✅ FIXED
      });
      e.target.value = ""; // Reset file input
    };
    reader.readAsDataURL(file);
  };

  // Fetch messages when selected user changes
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt="profile"
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt="back"
          className="md:hidden w-7 cursor-pointer"
        />
        <img
          src={assets.help_icon}
          alt="help"
          className="max-md:hidden w-5 cursor-pointer"
        />
      </div>

      {/* Chat Area */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6 gap-4">
        {messages.map((msg, index) => {
          const isSentByMe = msg.senderId === authUser._id;

          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                isSentByMe ? "justify-end" : "justify-start"
              }`}
            >
              {!isSentByMe && (
                <img
                  src={selectedUser?.profilePic || assets.profile_martin}
                  alt="avatar"
                  className="w-7 h-7 rounded-full"
                />
              )}

              <div
                className={`flex flex-col max-w-[250px] ${
                  isSentByMe ? "items-end" : "items-start"
                }`}
              >
                {msg.image ? (
                  <img
                    src={msg.image}
                    alt="chat"
                    className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-1"
                  />
                ) : (
                  <p
                    className={`p-2 text-sm font-light rounded-lg mb-1 break-words bg-violet-500/30 text-white ${
                      isSentByMe ? "rounded-br-none" : "rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </p>
                )}
                <p className="text-gray-500 text-xs">
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div>

              {isSentByMe && (
                <img
                  src={authUser?.profilePic || assets.avatar_icon}
                  alt="avatar"
                  className="w-7 h-7 rounded-full"
                />
              )}
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* Input area */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center gap-3 border-t border-white/0">
        <div className="flex items-center bg-white/20 rounded-full px-4 py-2 flex-1 gap-3 shadow-sm border border-white/30 backdrop-blur-lg">
          {/* Gallery icon */}
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={assets.gallery_icon}
              alt="gallery"
              className="w-5 opacity-80 hover:opacity-100"
            />
          </label>
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg, image/heic, image/dng"
            hidden
          />

          {/* Text input */}
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            type="text"
            placeholder="iMessage..."
            className="bg-transparent text-sm text-white flex-1 outline-none placeholder:text-white/50"
          />
        </div>

        {/* Send button */}
        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt="send"
          className="w-8 h-8 p-1.5 bg-sky-300 rounded-full shadow-md cursor-pointer hover:scale-105 transition"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden h-full w-full">
      <img src={assets.logo_icon} alt="logo" className="w-35" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
