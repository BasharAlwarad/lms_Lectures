const userData = [
  { id: 1, first_name: 'John', last_name: 'Doe', age: 25 },
  { id: 2, first_name: 'Bob', last_name: 'Dylan', age: 30 },
  { id: 3, first_name: 'Jane', last_name: 'Doe', age: 25 },
];

const relationalData = [
  { user_id: 1, email: 'john@example.com' },
  { user_id: 2, email: 'bob@example.com' },
  { user_id: 3, email: 'jane@example.com' },
];

function mergeUserData(users, relationalData) {
  const userMap = new Map();

  // Populate userMap with user data
  users.forEach((user) => {
    userMap.set(user.id, { ...user });
  });

  // Merge relational data into userMap
  relationalData.forEach((data) => {
    const userId = data.user_id;
    if (userMap.has(userId)) {
      const userData = userMap.get(userId);
      userMap.set(userId, { ...userData, ...data });
    }
  });

  // Convert userMap to an array of objects
  const mergedData = Array.from(userMap.values());

  return mergedData;
}

const mergedUserData = mergeUserData(userData, relationalData);
console.log(mergedUserData);
