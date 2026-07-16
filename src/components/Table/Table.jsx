import { useRef } from "react";
import styles from "./Table.module.css";

function Table({
  users,
  onSort,
  sortField,
  sortOrder,
  onUserClick,
  columnWidths,
  setColumnWidths,
}) {
  function getArrow(field) {
    if (sortField !== field) {
      return "";
    }

    if (sortOrder === "asc") {
      return " ↑";
    }

    if (sortOrder === "desc") {
      return " ↓";
    }

    return "";
  }

  // Какая колонка сейчас изменяется
  const activeColumn = useRef(null);

  // Начальная позиция мыши
  const startX = useRef(0);

  // Начальная ширина столбца
  const startWidth = useRef(0);

  function startResize(event, column) {
    event.preventDefault();
    event.stopPropagation();

    activeColumn.current = column;
    startX.current = event.clientX;
    startWidth.current = columnWidths[column];

    document.addEventListener("mousemove", resizeColumn);
    document.addEventListener("mouseup", stopResize);
  }

  function resizeColumn(event) {
    if (!activeColumn.current) {
      return;
    }

    const delta = event.clientX - startX.current;

    const width = Math.max(50, startWidth.current + delta);

    setColumnWidths((prev) => ({
      ...prev,
      [activeColumn.current]: width,
    }));
  }

  function stopResize() {
    document.removeEventListener("mousemove", resizeColumn);

    document.removeEventListener("mouseup", stopResize);

    activeColumn.current = null;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th
              style={{ width: columnWidths.fullName }}
              onClick={() => onSort("fullName")}
            >
              <div className={styles.header}>
                <span>ФИО{getArrow("fullName")}</span>

                <div
                  className={styles.resizeHandle}
                  onMouseDown={(event) => startResize(event, "fullName")}
                />
              </div>
            </th>

            <th
              style={{ width: columnWidths.age }}
              onClick={() => onSort("age")}
            >
              <div className={styles.header}>
                <span>Возраст{getArrow("age")}</span>

                <div
                  className={styles.resizeHandle}
                  onMouseDown={(event) => startResize(event, "age")}
                />
              </div>
            </th>

            <th
              style={{ width: columnWidths.gender }}
              onClick={() => onSort("gender")}
            >
              <div className={styles.header}>
                <span>Пол{getArrow("gender")}</span>

                <div
                  className={styles.resizeHandle}
                  onMouseDown={(event) => startResize(event, "gender")}
                />
              </div>
            </th>

            <th
              style={{ width: columnWidths.phone }}
              onClick={() => onSort("phone")}
            >
              <div className={styles.header}>
                <span>Телефон{getArrow("phone")}</span>

                <div
                  className={styles.resizeHandle}
                  onMouseDown={(event) => startResize(event, "phone")}
                />
              </div>
            </th>

            <th style={{ width: columnWidths.email }}>
              <div className={styles.header}>
                <span>Email</span>

                <div
                  className={styles.resizeHandle}
                  onMouseDown={(event) => startResize(event, "email")}
                />
              </div>
            </th>

            <th style={{ width: columnWidths.country }}>
              <div className={styles.header}>
                <span>Страна</span>

                <div
                  className={styles.resizeHandle}
                  onMouseDown={(event) => startResize(event, "country")}
                />
              </div>
            </th>

            <th style={{ width: columnWidths.city }}>
              <div className={styles.header}>
                <span>Город</span>

                <div
                  className={styles.resizeHandle}
                  onMouseDown={(event) => startResize(event, "city")}
                />
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => onUserClick(user)}>
              <td>
                {user.lastName} {user.firstName} {user.maidenName}
              </td>

              <td>{user.age}</td>

              <td>{user.gender === "male" ? "Мужской" : "Женский"}</td>

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
