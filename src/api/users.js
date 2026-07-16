/**
 * Функция для загрузки пользователей из DummyJSON API
 * @param {Object} params - Параметры запроса
 * @param {string} params.sortBy - Поле для сортировки
 * @param {string} params.order - Направление сортировки ('asc' или 'desc')
 * @returns {Promise<Array>} Массив пользователей
 * @throws {Error} С сообщением об ошибке, если запрос не удался
 */
export async function fetchUsers({ sortBy, order } = {}) {
  try {
    let url = "https://dummyjson.com/users";

    if (sortBy && order) {
      url += `?sortBy=${sortBy}&order=${order}`;
    }

    // Выполняем GET-запрос к API
    const response = await fetch(url);

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

    // Парсим JSON-ответ
    const data = await response.json();

    return data.users;
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error("Нет подключения к интернету.", { cause: error });
    }

    throw error;
  }
}
