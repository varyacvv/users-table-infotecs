export async function fetchUsers() {
  const response = await fetch("https://dummyjson.com/users");

  if (!response.ok) {
    throw new Error("Не удалось загрузить пользователей");
  }

  const data = await response.json();

  return data.users;
}