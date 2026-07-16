// src/hooks/useUsers.js
import { useEffect, useState, useCallback, useRef } from "react";
import { fetchUsers } from "../api/users";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  const isFirstRun = useRef(true); // флаг первого выполнения

  // Функция загрузки данных
  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params =
        sortField && sortOrder !== "none"
          ? { sortBy: sortField, order: sortOrder }
          : {};

      const data = await fetchUsers(params);
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [sortField, sortOrder]);

  // Перезагрузка для кнопки Retry
  const reload = useCallback(() => {
    loadUsers();
  }, [loadUsers]);

  // Загружаем при монтировании и при изменении сортировки
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false; // пропускаем повторный вызов в StrictMode
      loadUsers();
    } else {
      loadUsers(); // обычный вызов при изменении зависимостей
    }
  }, [loadUsers]);

  const changeSort = useCallback(
    (field) => {
      if (field !== sortField) {
        setSortField(field);
        setSortOrder("asc");
        return;
      }

      if (sortOrder === "none") {
        setSortOrder("asc");
      } else if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortField("");
        setSortOrder("none");
      }
    },
    [sortField, sortOrder],
  );

  return {
    users,
    loading,
    error,
    sortField,
    sortOrder,
    changeSort,
    reload,
  };
}
