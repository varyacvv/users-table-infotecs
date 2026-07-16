// src/App.jsx
import { useState } from "react";
import { useUsers } from "./hooks/useUsers";
import Table from "./components/Table/Table";
import Pagination from "./components/Pagination/Pagination";
import UserModal from "./components/UserModal/UserModal";
import Filters from "./components/Filters/Filters";
import Loader from "./components/Loader/Loader";
import Error from "./components/Error/Error";

function App() {
  // Параметры сортировки и данные теперь из хука
  const { users, loading, error, sortField, sortOrder, changeSort } =
    useUsers();

  // Состояния для фильтрации и пагинации (клиентские)
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");
  const [country, setCountry] = useState("all");

  // Ширины колонок
  const [columnWidths, setColumnWidths] = useState({
    fullName: 260,
    age: 90,
    gender: 120,
    phone: 180,
    email: 260,
    country: 180,
    city: 180,
  });

  const usersPerPage = 10;

  // Фильтрация (клиентская)
  const countries = [
    "all",
    ...new Set(users.map((user) => user.address.country)),
  ].sort();

  const filteredUsers = users.filter((user) => {
    const fullName =
      `${user.lastName} ${user.firstName} ${user.maidenName}`.toLowerCase();
    const matchesSearch = fullName.includes(search.toLowerCase());
    const matchesGender = gender === "all" || user.gender === gender;
    const matchesCountry =
      country === "all" || user.address.country === country;
    return matchesSearch && matchesGender && matchesCountry;
  });

  // Пагинация
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const start = (page - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(start, start + usersPerPage);

  // При изменении фильтров сбрасываем страницу на 1
  const handleFilterChange = (setter, value) => {
    setter(value);
    setPage(1);
  };

  // Обработка ошибки : можно попробовать перезагрузить (вызов changeSort или loadUsers)
  const handleRetry = () => {
    if (sortField && sortOrder !== "none") {
      changeSort(sortField); // это изменит сортировку и вызовет запрос
    } else {
      changeSort("lastName");
    }
  };

  return (
    <main>
      <h1>Пользователи</h1>
      <Filters
        search={search}
        setSearch={(value) => handleFilterChange(setSearch, value)}
        gender={gender}
        setGender={(value) => handleFilterChange(setGender, value)}
        country={country}
        setCountry={(value) => handleFilterChange(setCountry, value)}
        countries={countries}
      />

      {loading && <Loader />}
      {error && <Error message={error} onRetry={handleRetry} />}

      {!loading && !error && (
        <>
          <Table
            users={currentUsers}
            onSort={changeSort}
            sortField={sortField}
            sortOrder={sortOrder}
            onUserClick={setSelectedUser}
            columnWidths={columnWidths}
            setColumnWidths={setColumnWidths}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </main>
  );
}

export default App;
