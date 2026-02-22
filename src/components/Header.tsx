import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Web App</h1>
        <p className={styles.subtitle}>실시간 실험 대시보드</p>
      </div>
    </header>
  );
}

export default Header;
