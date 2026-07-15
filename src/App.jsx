import { useState } from "react";
import { useUsers } from "./hooks/useUsers";
import { sortUsers } from "./utils/sortUsers";
import Table from "./components/Table/Table";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const { users, loading, error } = useUsers();

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [page, setPage] = useState(1);

  const usersPerPage = 10;

  function handleSort(field) {
    if (field !== sortField) {
      setSortField(field);
      setSortOrder("asc");
      setPage(1); // после сортировки возвращаемся на первую страницу
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

    setPage(1);
  }

  const sortedUsers = sortUsers(users, sortField, sortOrder);

  const start = (page - 1) * usersPerPage;
  const end = start + usersPerPage;

  const currentUsers = sortedUsers.slice(start, end);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  if (loading) {
    return <h2>Загрузка...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <main>
      <h1>Пользователи</h1>

      <Table
        users={currentUsers}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </main>
  );
}

export default App;