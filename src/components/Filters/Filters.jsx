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
<select
  value={country}
  onChange={(event) => setCountry(event.target.value)}
>
  {countries.map((country) => (
    <option key={country} value={country}>
      {country === "all" ? "Все страны" : country}
    </option>
  ))}
</select>
    </div>
  );
}

export default Filters;