export async function fetchUsers() {
  try {
    const response = await fetch("https://dummyjson.com/users");

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error("Пользователи не найдены.");

        case 500:
          throw new Error("Ошибка сервера. Попробуйте позже.");

        default:
          throw new Error("Не удалось загрузить пользователей.");
      }
    }

    const data = await response.json();

    return data.users;
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error("Нет подключения к интернету.",  { cause: error });
    }

    throw error;
  }
}