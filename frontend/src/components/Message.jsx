import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector(store => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Function to get sentiment emoji based on sentiment score
  const getSentimentEmoji = (score) => {
    if (score > 0) return "😇";
    if (score < 0) return "😢";
    return "😊"; // neutral
  };

  return (
    <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User profile"
            src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto}
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 text-white">12:45</time>
      </div>
      <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''} `}>
        {message?.message} <span style={{ marginLeft: '8px' }}>{getSentimentEmoji(message.sentiment)}</span>
      </div>
    </div>
  );
};

export default Message;
