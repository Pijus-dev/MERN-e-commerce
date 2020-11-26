import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  userMessage,
  createSession,
  sendMessage,
} from "../../redux/chatReducer/chatActions";
import axios from "axios";
import "./chat.scss";

const Chat = () => {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const session = localStorage.getItem("session");
  const endOfMessages = useRef(null);

  const chat = useSelector((state) => state.chat);
  const { messages } = chat;
  const dispatch = useDispatch();

  const scrollToBottom = () => {
    if (messages && messages.length > 0) {
      endOfMessages.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message !== "") {
      dispatch(userMessage(message));
      dispatch(sendMessage(message));
      setMessage("");
    }
  };

  if (session) {
    axios.defaults.headers.common["session_id"] = session;
  } else {
    delete axios.defaults.headers.common["session_id"];
  }

  useEffect(() => {
    if (!session) {
      dispatch(createSession());
    }
  }, []);
  return (
    <div className="wrapper">
      <i
        className="fas fa-comment-alt fa-2x"
        onClick={() => setShowChat(!showChat)}
      ></i>
      {showChat && (
        <div className="chatBotContainer">
          <div className="chatBot">
            {messages.length > 0 &&
              messages.map(({ message, type }, idx) => (
                <div key={idx} className={`${type}`}>
                  {message}
                </div>
              ))}
            <div ref={endOfMessages}></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="formInput">
              <input
                placeholder="enter your message"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
