import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

function Dashboard() {
  // Get the chats from our global ChatContext.
  const { chats } = useContext(ChatContext);

  // Count the total number of messages
  // across all chats.
  const totalMessages = chats.reduce(
    (total, chat) => total + chat.messages.length,
    0
  );

  // Count messages sent by "Me".
  const sentMessages = chats.reduce(
    (total, chat) =>
      total +
      chat.messages.filter(
        (message) => message.sender === "Me"
      ).length,
    0
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your Chat App.</p>
      </div>

      {/* Dashboard statistics */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h2>{chats.length}</h2>
          <p>Total Chats</p>
        </div>

        <div className="stat-card">
          <h2>{totalMessages}</h2>
          <p>Total Messages</p>
        </div>

        <div className="stat-card">
          <h2>{sentMessages}</h2>
          <p>Messages Sent</p>
        </div>
      </div>

      {/* Recent chats */}
      <div className="recent-chats">
        <h2>Recent Chats</h2>

        {chats.length === 0 ? (
          <p>No chats available.</p>
        ) : (
          chats.map((chat) => (
            <div className="recent-chat" key={chat.id}>
              <div>
                <h3>{chat.name}</h3>
                <p>{chat.lastMessage}</p>
              </div>

              <span>
                {chat.messages.length} messages
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;