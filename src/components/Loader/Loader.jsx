import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p>Загрузка пользователей...</p>
    </div>
  );
}

export default Loader;