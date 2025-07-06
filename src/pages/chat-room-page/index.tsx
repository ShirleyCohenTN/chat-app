import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks";
import { Message } from "../../types";
import { Header, ChatMessage } from "../../components";
import styles from "./style.module.css";

export const ChatRoomPage = () => {
  const navigate = useNavigate();
  const { roomName } = useParams<{ roomName: string }>();
  const { getCurrentUser } = useAuth();
  const username = getCurrentUser() || "";
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const broadcastRef = useRef<BroadcastChannel | null>(null); // stores the BroadcastChannel object (used to sync tabs)
  const messageEndRef = useRef<HTMLDivElement | null>(null); // scrolls to the bottom of the chat

  const roomKey = `chat:${roomName}`;

  useEffect(() => {
    const storedMessages = JSON.parse(
      localStorage.getItem(roomKey) || "[]"
    ) as Message[];
    setMessages(storedMessages);

    // open a broadcast channel, named per room (real time communication channel, for different tabs of the same origin)
    const bc = new BroadcastChannel(`chat-room-${roomName}`);
    broadcastRef.current = bc;

    bc.onmessage = (event) => {
      if (event.data.type === "new-message") {
        setMessages((prev) => [...prev, event.data.message]);
      }
    };

    return () => {
      bc.close();
    };
  }, [roomName, roomKey]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() || !username) return;
    const msg: Message = {
      sender: username,
      text: newMessage,
      timestamp: Date.now(),
    };

    const updatedMsgs = [...messages, msg];
    localStorage.setItem(roomKey, JSON.stringify(updatedMsgs));
    setMessages(updatedMsgs);
    setNewMessage("");

    // notify other tabs
    broadcastRef.current?.postMessage({ type: "new-message", message: msg });
  };

  const handleLeaveRoom = () => {
    navigate("/chat-rooms");
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <h2>Chat Room: {roomName}</h2>
      <button onClick={handleLeaveRoom} className={styles.leaveButton}>
        Leave Room
      </button>
      <div className={styles.chatBox}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} currentUsername={username} />
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={newMessage}
          placeholder="Type a message..."
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};
