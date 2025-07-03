import { useAuth } from "../../hooks";
import styles from "./style.module.css";

export const Header = () => {
  const { getCurrentUser, logout } = useAuth();
  const currentUser = getCurrentUser();

  return (
    <header className={styles.header}>
      <div className={styles.userInfo}>
        <span>👤 {currentUser}</span>
      </div>
      <button onClick={logout} className={styles.logoutButton}>
        Logout
      </button>
    </header>
  );
};
