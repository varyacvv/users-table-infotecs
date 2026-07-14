import { useState } from "react";
import { useUsers } from "./hooks/useUsers";
import { sortUsers } from "./utils/sortUsers";
import Table from "./components/Table/Table";

function App() {
  const { users, loading, error } = useUsers();

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("none");

  function handleSort(field) {
    if (field !== sortField) {
      setSortField(field);
      setSortOrder("asc");
      return;
    }

    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortField("");
      setSortOrder("none");
    } else {
      setSortOrder("asc");
    }
  }

  const sortedUsers = sortUsers(users, sortField, sortOrder);

  if (loading) return <h2>Загрузка...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <main>
      <h1>Пользователи</h1>

      <Table
        users={sortedUsers}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
      />
    </main>
  );
}

export default App;