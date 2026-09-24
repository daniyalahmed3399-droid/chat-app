import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { ChatContext } from "../context/ChatContext";

function ChatWindow() {
  const { selectedChat, sendMessage } =
    useContext(ChatContext);

  const [messageText, setMessageText] = useState("");

  // Create a reference to the bottom of the messages.
  const messagesEndRef = useRef(null);

  // Automatically scroll to the newest message.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [selectedChat?.messages]);

  // Send the message.
  function handleSend() {
    if (messageText.trim() === "") {
      return;
    }

    sendMessage(messageText);

    setMessageText("");
  }

  // Show this when no chat is selected.
  if (!selectedChat) {
    return (
      <div className="chat-window empty-chat">
        <h2>Select a chat</h2>
        <p>Choose someone from the chat list.</p>
      </div>
    );
  }

  return (
    <div className="chat-window">

      {/* Chat header */}
      <div className="chat-header">
        <h2>{selectedChat.name}</h2>
        <p>Online</p>
      </div>

      {/* Messages */}
      <div className="messages">
        {selectedChat.messages.map((message) => (
          <div
            className={
              message.sender === "Me"
                ? "message my-message"
                : "message other-message"
            }
            key={message.id}
          >
            <strong>{message.sender}</strong>

            <p>{message.text}</p>

            <span className="message-time">
              {message.time}
            </span>
          </div>
        ))}

        {/* Invisible element used for auto-scrolling */}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Message input */}
      <div className="message-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={messageText}
          onChange={(event) =>
            setMessageText(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;