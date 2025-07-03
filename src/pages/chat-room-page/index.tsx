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
  const broadcastRef = useRef<BroadcastChannel | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const key = `chat:${roomName}`;
    const storedMessages = JSON.parse(
      localStorage.getItem(key) || "[]"
    ) as Message[];
    setMessages(storedMessages);

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
  }, [roomName]);

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

    const key = `chat:${roomName}`;
    const updatedMsgs = [...messages, msg];
    localStorage.setItem(key, JSON.stringify(updatedMsgs));
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
