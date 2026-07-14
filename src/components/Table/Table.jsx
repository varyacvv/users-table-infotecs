import styles from "./Table.module.css";

function Table({ users, onSort, sortField, sortOrder }) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
  <tr>
    <th onClick={() => onSort("fullName")}>
      ФИО {sortField === "fullName" && (sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : "")}
    </th>

    <th onClick={() => onSort("age")}>
      Возраст {sortField === "age" && (sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : "")}
    </th>

    <th onClick={() => onSort("gender")}>
      Пол {sortField === "gender" && (sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : "")}
    </th>

    <th onClick={() => onSort("phone")}>
      Телефон {sortField === "phone" && (sortOrder === "asc" ? "↑" : sortOrder === "desc" ? "↓" : "")}
    </th>

    <th>Email</th>
    <th>Страна</th>
    <th>Город</th>
  </tr>
</thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.lastName}</td>
              <td>{user.firstName}</td>
              <td>{user.maidenName}</td>
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