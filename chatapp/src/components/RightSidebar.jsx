import React, { useContext, useEffect, useState } from "react";
import assets, { imagesDummyData } from "../assets/assets";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);
  //get all the images from the message and set them to state
  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);
  return (
    selectedUser && (
      <div
        className={`relative p-6 text-white border-l border-white/20 h-full bg-white/5 ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Profile Picture */}
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt="profile"
            className="w-20 h-20 rounded-full object-cover shadow-md"
          />

          {/* Name + Status */}
          <div className="flex items-center gap-2">
            {onlineUsers.includes(selectedUser._id) && (
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            )}
            <h1 className="text-xl font-semibold">{selectedUser.fullName}</h1>
          </div>

          {/* Bio */}
          <p className="text-sm text-center text-gray-300 max-w-[200px]">
            {selectedUser.bio || "No bio available"}
          </p>
        </div>

        <hr className="border-[#ffffff50] my-5" />

        {/* Media Gallery */}
        <div className="px-5 text-xs pb-28">
          {" "}
          {/* Add bottom padding to prevent overlap */}
          <p>Media</p>
          <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
            {msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded"
              >
                <img src={url} alt="" className="h-full rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => logout()}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-300 to-sky-400 text-black text-sm  hover:text-amber-900 font-light py-2 px-10 rounded-full cursor-pointer shadow-md transition hover:scale-105"
        >
          Logout
        </button>
      </div>
    )
  );
};

export default RightSidebar;
