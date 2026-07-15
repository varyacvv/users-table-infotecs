import { useState } from "react";
import { useUsers } from "./hooks/useUsers";
import { sortUsers } from "./utils/sortUsers";
import Table from "./components/Table/Table";
import Pagination from "./components/Pagination/Pagination";
import UserModal from "./components/UserModal/UserModal";
import Filters from "./components/Filters/Filters";

function App() {
  const { users, loading, error } = useUsers();

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");
  const [country, setCountry] = useState("all");

  const usersPerPage = 10;

  function handleSort(field) {
    if (field !== sortField) {
      setSortField(field);
      setSortOrder("asc");
      setPage(1);
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
  const countries = [
    "all",
    ...new Set(users.map((user) => user.address.country)),
  ].sort();
  const filteredUsers = sortedUsers.filter((user) => {
    const fullName =
      `${user.lastName} ${user.firstName} ${user.maidenName}`.toLowerCase();

    const matchesSearch = fullName.includes(search.toLowerCase());

    const matchesGender = gender === "all" || user.gender === gender;
    const matchesCountry =
      country === "all" || user.address.country === country;

    return matchesSearch && matchesGender && matchesCountry;
  });

  const start = (page - 1) * usersPerPage;
  const end = start + usersPerPage;

  const currentUsers = filteredUsers.slice(start, end);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) {
    return <h2>Загрузка...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <main>
      <h1>Пользователи</h1>
      <Filters
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        gender={gender}
        setGender={(value) => {
          setGender(value);
          setPage(1);
        }}
        country={country}
        setCountry={(value) => {
          setCountry(value);
          setPage(1);
        }}
        countries={countries}
      />
      <Table
        users={currentUsers}
        onSort={handleSort}
        sortField={sortField}
        sortOrder={sortOrder}
        onUserClick={setSelectedUser}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </main>
  );
}

export default App;
