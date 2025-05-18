import { useAuth } from "../../context/auth-context";
import Header from "../../components/header/Header";
import HomeGrid from "../../components/home/home-grid/HomeGrid";
import styles from "./Home.module.css";

export default function Home() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.homeContainer}>
      <Header onLogout={handleLogout} />
      <main className={styles.content}>
        <HomeGrid />
      </main>
    </div>
  );
}
