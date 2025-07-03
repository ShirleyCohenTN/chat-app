import styles from "./style.module.css";
import { Message } from "../../types";

interface ChatMessageProps {
  message: Message;
  currentUsername: string;
}

export const ChatMessage = ({ message, currentUsername }: ChatMessageProps) => {
  const isOwn = message.sender === currentUsername;

  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`${styles.message} ${isOwn ? styles.own : styles.other}`}>
      <div className={styles.messageHeader}>
        <strong>{message.sender}</strong>
        <span className={styles.timestamp}>{time}</span>
      </div>
      <div className={styles.text}>{message.text}</div>
    </div>
  );
};
