import styles from "./Filters.module.css";

function Filters({
  search,
  setSearch,
  gender,
  setGender,
  country,
  setCountry,
  countries,
}) {
  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <input
          type="text"
          placeholder="Поиск по ФИО..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="genderSelect" className={styles.label}>
          Пол:
        </label>
        <select
          id="genderSelect"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
          title="Выберите пол"  // всплывающая подсказка при наведении
        >
          <option value="all">Все</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="countrySelect" className={styles.label}>
          Страна:
        </label>
        <select
          id="countrySelect"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          title="Выберите страну"
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country === "all" ? "Все" : country}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filters;