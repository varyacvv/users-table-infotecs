import styles from "./Filters.module.css";

function Filters({
  search,
  setSearch,
  gender,
  setGender,
}) {
  return (
    <div className={styles.filters}>
      <span className={styles.icon}>🔍</span>

      <input
        type="text"
        placeholder="Поиск по ФИО..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <select
  value={gender}
  onChange={(event) => setGender(event.target.value)}
>
  <option value="all">Все</option>
  <option value="male">Мужской</option>
  <option value="female">Женский</option>
</select>
    </div>
  );
}

export default Filters;