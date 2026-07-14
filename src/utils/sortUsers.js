export function sortUsers(users, sortField, sortOrder) {
  if (!sortField || sortOrder === "none") {
    return users;
  }

  const sortedUsers = [...users];

  sortedUsers.sort((a, b) => {
    let firstValue;
    let secondValue;

    switch (sortField) {
      case "fullName":
        firstValue = `${a.lastName} ${a.firstName} ${a.maidenName}`;
        secondValue = `${b.lastName} ${b.firstName} ${b.maidenName}`;
        break;

      case "age":
        firstValue = a.age;
        secondValue = b.age;
        break;

      case "gender":
        firstValue = a.gender;
        secondValue = b.gender;
        break;

      case "phone":
        firstValue = a.phone;
        secondValue = b.phone;
        break;

      default:
        return 0;
    }

    if (typeof firstValue === "string") {
      const result = firstValue.localeCompare(secondValue);

      return sortOrder === "asc" ? result : -result;
    }

    return sortOrder === "asc"
      ? firstValue - secondValue
      : secondValue - firstValue;
  });

  return sortedUsers;
}