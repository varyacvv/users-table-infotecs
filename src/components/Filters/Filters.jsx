import styles from "./Filters.module.css";

function Filters({ search, setSearch }) {
  return (
    <div className={styles.filters}>
      <span className={styles.icon}>🔍</span>

      <input
        type="text"
        placeholder="Поиск по ФИО..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
}

export default Filters;