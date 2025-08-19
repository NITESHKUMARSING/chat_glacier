import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);
  return (
    <div className="text-amber-50 border w-full h-screen sm:px-[15%] sm:py-[5%] backdrop-blur-xl">
      <div
        className={` backdrop-blur-xl border-2 border-gray-600 rounded-2x1 overflow-hidden h-[100%] grid grid-cols-1 relative ${
          selectedUser
            ? "md:grid-cols-[1fr_1.5fr_1fr] X1:grid-cols-[1fr_2fr_1fr]"
            : "md:grid-cols-2"
        }`}
      >
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
