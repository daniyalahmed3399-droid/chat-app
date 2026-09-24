import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";

function ChatList() {
  const {
    chats,
    selectedChat,
    setSelectedChat,
    addChat,
    deleteChat,
    editChat,
  } = useContext(ChatContext);

  // State for adding a new chat.
  const [newChatName, setNewChatName] = useState("");

  // State for editing an existing chat.
  const [editingChatId, setEditingChatId] = useState(null);
  const [editedName, setEditedName] = useState("");

  // Add a new chat.
  function handleAddChat() {
    if (newChatName.trim() === "") {
      return;
    }

    addChat(newChatName);

    setNewChatName("");
  }

  // Delete a chat.
  function handleDeleteChat(event, id) {
    // Prevent the chat item from being selected
    // when the Delete button is clicked.
    event.stopPropagation();

    deleteChat(id);
  }

  // Start editing a chat.
  function handleEditStart(event, chat) {
    event.stopPropagation();

    setEditingChatId(chat.id);
    setEditedName(chat.name);
  }

  // Save the edited chat name.
  function handleEditSave(event, id) {
    event.stopPropagation();

    if (editedName.trim() === "") {
      return;
    }

    editChat(id, editedName);

    setEditingChatId(null);
    setEditedName("");
  }

  // Cancel editing.
  function handleEditCancel(event) {
    event.stopPropagation();

    setEditingChatId(null);
    setEditedName("");
  }

  return (
    <div className="chat-list">
      <h2>Chats</h2>

      {/* Add a new chat */}
      <div className="new-chat">
        <input
          type="text"
          placeholder="Enter name..."
          value={newChatName}
          onChange={(event) =>
            setNewChatName(event.target.value)
          }
        />

        <button onClick={handleAddChat}>Add</button>
      </div>

      {/* Display all chats */}
      {chats.map((chat) => (
        <div
          className={
            selectedChat?.id === chat.id
              ? "chat-item selected"
              : "chat-item"
          }
          key={chat.id}
          onClick={() => setSelectedChat(chat)}
        >
          <div className="chat-info">
            {editingChatId === chat.id ? (
              <div className="edit-chat">
                <input
                  type="text"
                  value={editedName}
                  onChange={(event) =>
                    setEditedName(event.target.value)
                  }
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                />

                <button
                  onClick={(event) =>
                    handleEditSave(event, chat.id)
                  }
                >
                  Save
                </button>

                <button onClick={handleEditCancel}>
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h3>{chat.name}</h3>
                <p>{chat.lastMessage}</p>
              </>
            )}
          </div>

          <div className="chat-actions">
            <button
              onClick={(event) =>
                handleEditStart(event, chat)
              }
            >
              Edit
            </button>

            <button
              className="delete-chat"
              onClick={(event) =>
                handleDeleteChat(event, chat.id)
              }
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;