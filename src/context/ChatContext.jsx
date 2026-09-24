import { createContext, useState } from "react";

// Create the Context object.
const ChatContext = createContext();

function ChatProvider({ children }) {
  // Store all chats and their messages.
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Ali",
      lastMessage: "I'm doing great!",
      messages: [
        {
          id: 1,
          sender: "Ali",
          text: "Hey, how are you?",
          time: "10:30 AM",
        },
        {
          id: 2,
          sender: "Me",
          text: "I'm good! How about you?",
          time: "10:32 AM",
        },
        {
          id: 3,
          sender: "Ali",
          text: "I'm doing great!",
          time: "10:35 AM",
        },
      ],
    },

    {
      id: 2,
      name: "Ahmed",
      lastMessage: "Yes, I'll be there.",
      messages: [
        {
          id: 1,
          sender: "Ahmed",
          text: "Are you coming today?",
          time: "9:15 AM",
        },
        {
          id: 2,
          sender: "Me",
          text: "Yes, I'll be there.",
          time: "9:20 AM",
        },
      ],
    },

    {
      id: 3,
      name: "Sara",
      lastMessage: "Sure, see you tomorrow!",
      messages: [
        {
          id: 1,
          sender: "Sara",
          text: "See you tomorrow!",
          time: "8:40 PM",
        },
        {
          id: 2,
          sender: "Me",
          text: "Sure, see you tomorrow!",
          time: "8:42 PM",
        },
      ],
    },
  ]);

  // Store the currently selected chat.
  const [selectedChat, setSelectedChat] = useState(null);

  // Store the currently logged-in user.
  const [currentUser, setCurrentUser] = useState(null);

  // =========================
  // LOGIN
  // =========================

  function login(username, password) {
  // Temporary account for our frontend-only login.
  const correctUsername = "Daniyal";
  const correctPassword = "12345";

  // Check whether the entered credentials are correct.
  if (
    username !== correctUsername ||
    password !== correctPassword
  ) {
    return false;
  }

  // Store the logged-in user.
  setCurrentUser({
    username: username,
  });

  return true;
}

  // =========================
  // LOGOUT
  // =========================

  function logout() {
    // Remove the current user.
    setCurrentUser(null);

    // Also remove the currently selected chat.
    setSelectedChat(null);
  }

  // =========================
  // SEND MESSAGE
  // =========================

  function sendMessage(text) {
    if (!selectedChat) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      sender: "Me",
      text: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Update the chat inside the chats array.
    setChats((previousChats) =>
      previousChats.map((chat) =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              lastMessage: text,
              messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );

    // Update the currently selected chat.
    setSelectedChat((previousChat) => ({
      ...previousChat,
      lastMessage: text,
      messages: [...previousChat.messages, newMessage],
    }));
  }

  // =========================
  // ADD CHAT
  // =========================

  function addChat(name) {
    const newChat = {
      id: Date.now(),
      name: name,
      lastMessage: "No messages yet.",
      messages: [],
    };

    setChats((previousChats) => [
      ...previousChats,
      newChat,
    ]);

    setSelectedChat(newChat);
  }

  // =========================
  // DELETE CHAT
  // =========================

  function deleteChat(id) {
    setChats((previousChats) =>
      previousChats.filter((chat) => chat.id !== id)
    );

    setSelectedChat((previousChat) => {
      if (previousChat?.id === id) {
        return null;
      }

      return previousChat;
    });
  }

  // =========================
  // EDIT CHAT
  // =========================

  function editChat(id, newName) {
    setChats((previousChats) =>
      previousChats.map((chat) =>
        chat.id === id
          ? {
              ...chat,
              name: newName,
            }
          : chat
      )
    );

    setSelectedChat((previousChat) => {
      if (previousChat?.id === id) {
        return {
          ...previousChat,
          name: newName,
        };
      }

      return previousChat;
    });
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,

        selectedChat,
        setSelectedChat,

        sendMessage,
        addChat,
        deleteChat,
        editChat,

        // Authentication values
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export { ChatContext, ChatProvider };