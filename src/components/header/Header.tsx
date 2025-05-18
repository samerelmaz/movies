import styles from "./Header.module.css";

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Movies App</h1>
        <button className={styles.logoutButton} onClick={onLogout}>
          Log out
        </button>
      </div>
    </header>
  );
}
