import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage, ChatRoomSelectionPage } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/chat-rooms" element={<ChatRoomSelectionPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
