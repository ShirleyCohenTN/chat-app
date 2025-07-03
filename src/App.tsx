import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
