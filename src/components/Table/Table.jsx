import styles from "./Table.module.css";

function Table({ users, onSort, sortField, sortOrder }) {
  function getArrow(field) {
    if (sortField !== field) return "";

    if (sortOrder === "asc") return " ↑";
    if (sortOrder === "desc") return " ↓";

    return "";
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => onSort("fullName")}>
              ФИО{getArrow("fullName")}
            </th>

            <th onClick={() => onSort("age")}>
              Возраст{getArrow("age")}
            </th>

            <th onClick={() => onSort("gender")}>
              Пол{getArrow("gender")}
            </th>

            <th onClick={() => onSort("phone")}>
              Телефон{getArrow("phone")}
            </th>

            <th>Email</th>
            <th>Страна</th>
            <th>Город</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.lastName} {user.firstName} {user.maidenName}
              </td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address.country}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;