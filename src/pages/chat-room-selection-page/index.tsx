import { useEffect, useState } from "react";
import { LOCAL_STORAGE_KEYS } from "../../constants";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import styles from "./style.module.css";

export const ChatRoomSelectionPage = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<string[]>([]);
  const [newRoom, setNewRoom] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedChatRooms = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.CHAT_ROOMS) || "[]"
    );
    setRooms(storedChatRooms);
  }, []);

  const handleCreateRoom = () => {
    const trimmed = newRoom.trim();
    if (!trimmed) return;

    const exists = rooms.some(
      (room) => room.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      setError("Room name already exists");
      return;
    }

    const updated = [...rooms, trimmed];
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CHAT_ROOMS,
      JSON.stringify(updated)
    );
    setRooms(updated);
    setNewRoom("");
    setError("");
  };

  const handleJoinRoom = (roomName: string) => {
    navigate(`/chat/${roomName}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Header />

        <h2 className={styles.title}>Select a Chat Room</h2>

        {rooms && rooms.length > 0 ? (
          <>
            <h3>Rooms:</h3>
            <ul className={styles.roomList}>
              {rooms.map((room) => (
                <li
                  key={room}
                  className={styles.roomItem}
                  onClick={() => handleJoinRoom(room)}
                >
                  {room}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>There are no chat rooms available yet.</p>
        )}

        <hr className={styles.divider} />

        <h2 className={styles.title}>Create a Chat Room</h2>

        <div className={styles.inputGroup}>
          <input
            type="text"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            placeholder="New Room Name"
          />
          <button onClick={handleCreateRoom}>Create</button>
        </div>

        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};
