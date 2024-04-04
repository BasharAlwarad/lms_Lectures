<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="../styles/styles.css" />
<title>SQL</title>
</head>
<body>
<header class="header">
<h1>SQL (Structured Query Language)</h1>
</header>
<nav class="nav">
<ul class="nav__list">
<li><a href="#SQLIntro">SQL Intro</a></li>
<li><a href="#SQLEnvironment">SQL Environment</a></li>
<li><a href="#SQLCommands">SQL Commands</a></li>
<li><a href="#SQLConditionals">SQL Conditionals</a></li>
</ul >
</nav>

<main class="main">
<section>
<strong id="SQLIntro">SQL Intro:</strong>
<ul>
<li>

### Why SQL?

1. SQL was invented by Donald Chamberlin and Raymond Boyce at IBM in the early 1970s.
2. Before SQL, each database system had its own unique language for managing data, making it difficult to work with multiple systems or migrate data between them.
3. SQL was invented to provide a standardized language for interacting with relational databases. 4. Here is an example of merging two different data structure int one object by using vanilla js.

```js
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
```

5. This is how we can do it with SQL.

```sql
SELECT u.id, u.name, u.age, r.email
FROM users u
JOIN relational_data r ON u.id = r.user_id;
```

6. How is that applicable in a real-world scenario?

</li>
</ul>
</section>
<section>
<strong id="SQLEnvironment">SQL Environment</strong>
<ul>
<li>

### RDBMS Relational Database Management System

</li>
</ul>
</section>

<section>
<strong id="SQLCommands">SQL Commands</strong>
<ul>
<li>

### The similarly between Table and object

1. In the pervious projects we have been receiving the data from some API in a json shape or an object.
   <br> for example:

```js
const users = [
  { id: 1, first_name: 'John', last_name: 'Doe', age: 25 },
  { id: 2, first_name: 'Bob', last_name: 'Dylan', age: 30 },
  { id: 3, first_name: 'Jane', last_name: 'Doe', age: 25 },
];
```

2. But how is this data created in the first place.
   <br> every data must have a Schema or a structure to follow for consistency.

```js
const users = [
  {
    id: Number,
    first_name: String,
    last_name: String,
    age: Number,
  },
];
```

2. In SQL we can achieve this basic structure for the data by <b>CREATE</b> a <b>TABLE</b>.
   <br> as the following.

```sql
CREATE TABLE users (       -- Create a table with the name users
  id SERIAL PRIMARY KEY,   -- automatically serialize the ids after every change
  first_name VARCHAR(255), -- variable character string of length 255
  last_name VARCHAR(255),  -- 255 because each byte can fit 255 char in it
  age INT                  -- integer
);
```

<br>
<table>
  <thead>
    <tr>
      <th class="th">id</th>
      <th class="th">first_name</th>
      <th class="th">last_name</th>
      <th class="th">age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="td">----</td>
      <td class="td">----</td>
      <td class="td">----</td>
      <td class="td">----</td>
    </tr>
  </tbody>
</table>

3. <a href="https://www.sqltutorial.org/sql-cheat-sheet/">SQL data types </a>
</li>
<li>

### SQL INSERT.

1. but that was only the table not the data. to add data
   <br> we need to <b>INSERT</b> data in the <b>TABLE</b>.

```sql
INSERT INTO users (first_name, last_name, age) -- Insert in (first_name, last_name,age) from table users
VALUES ('John', 'Doe', 18);                    -- values are John Doe 18
```

<br>
<table>
  <thead>
    <tr>
      <th class="th">id</th>
      <th class="th">first_name</th>
      <th class="th">last_name</th>
      <th class="th">age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="td">1</td>
      <td class="td">John</td>
      <td class="td">Doe</td>
      <td class="td">18</td>
    </tr>
  </tbody>
</table>

2. Notes to remember:

   - use Uppercase for SQL commands.
   - use single quotes always for the values.
   - use semicolon at the end of each command.
   </li>

<li>

### INSERT many rows at once.

```sql
INSERT INTO users (first_name, last_name, age) -- Insert in (first_name, last_name,age) from table users
VALUES ('John', 'Doe', 18),                    -- values are John Doe 18
       ('Bob', 'Dylan', 30),                   -- values are Bog Dylan 30
       ('Jane', 'Doe', 25);                    -- values are Jane Doe 25
```

<br>
<table>
  <thead>
    <tr>
      <th class="th">id</th>
      <th class="th">first_name</th>
      <th class="th">last_name</th>
      <th class="th">age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="td">1</td>
      <td class="td">John</td>
      <td class="td">Doe</td>
      <td class="td">18</td>
    </tr>
    <tr>
      <td class="td">2</td>
      <td class="td">Bob</td>
      <td class="td">Dylan</td>
      <td class="td">30</td>
    </tr>
    <tr>
      <td class="td">3</td>
      <td class="td">Jane</td>
      <td class="td">Doe</td>
      <td class="td">25</td>
    </tr>
  </tbody>
</table>

</li>
<li>

### CRUD Functionality in SQL.

1. when dealing with data usually we need to interact whit it in one of the <i>CRUD</i> methods
   <br> create, read, update, delete

2. we learn how to create with <b>INSERT</b>,
   <br> and now we can read with <b>SELECT</b>

```sql
SELECT *    -- return every columns
FROM users; -- from table users
```

<br>
<table>
  <tbody>
    <tr>
      <td class="td">1</td>
      <td class="td">John</td>
      <td class="td">Doe</td>
      <td class="td">18</td>
    </tr>
    <tr>
      <td class="td">2</td>
      <td class="td">Bob</td>
      <td class="td">Dylan</td>
      <td class="td">30</td>
    </tr>
    <tr>
      <td class="td">1</td>
      <td class="td">Jane</td>
      <td class="td">Doe</td>
      <td class="td">25</td>
    </tr>
  </tbody>
</table>

- Datat to the frontend will be as follows:

```js
const users = [
  { id: 1, first_name: 'John', last_name: 'Doe', age: 25 },
  { id: 2, first_name: 'Bob', last_name: 'Dylan', age: 30 },
  { id: 3, first_name: 'Jane', last_name: 'Doe', age: 25 },
];
```

<br>
it is exactly as dealing with an API that returns a JSON object by using a fetch request.
<br> From this Point onwards all what is left is to put this data in HTML elements on your frontend.

4. We can also chose what to get from the table instead of getting everything

```sql
SELECT first_name  -- return only first_names columns
FROM users;        -- from table users
```

<br>
<table>
  <tbody>
    <tr>
      <td class="td">John</td>
    </tr>
    <tr>
      <td class="td">Bob</td>
    </tr>
    <tr>
      <td class="td">Jane</td>
    </tr>
  </tbody>
</table>

- Datat to the frontend will be as follows:

```js
const users = [
  { first_name: 'John' },
  { first_name: 'Bob' },
  { first_name: 'Jane' },
];
```

4. we can get/read multiple columns

```sql
SELECT first_name, last_name  --  will return first names and last_names columns
FROM users                    -- from table users
```

<br>
<table>
  <tbody>
    <tr>
      <td class="td">John</td>
      <td class="td">Doe</td>
    </tr>
    <tr>
      <td class="td">Bob</td>
      <td class="td">Dylan</td>
    </tr>
    <tr>
      <td class="td">Jane</td>
      <td class="td">Doe</td>
    </tr>
  </tbody>
</table>

- Datat to the frontend will be as follows:

```js
const users = [
  { first_name: 'John', last_name: 'Doe' },
  { first_name: 'Bob', last_name: 'Dylan' },
  { first_name: 'Jane', last_name: 'Doe' },
];
```

</li>
</ul>
</section>

<section>
<strong id="SQLConditionals">SQL Conditionals</strong>
<ul>
<li>

### How to filter data in SQL?

1. We managed to read/get data from the table from each single row. But how do we get specific rows based on certain conditions?

- Use <b>WHERE</b> clause to specify conditions for filtering rows.
- get all users if only they are above 18 years old!

```sql
SELECT *        --  will return all rows
FROM users      --  from table users
WHERE age > 18  --  filter out columns with age value > 18
```

<br>
<table>
  <tbody>
    <tr>
      <td class="td">2</td>
      <td class="td">Bob</td>
      <td class="td">Dylan</td>
      <td class="td">30</td>
    </tr>
    <tr>
      <td class="td">3</td>
      <td class="td">Jane</td>
      <td class="td">Doe</td>
      <td class="td">25</td>
    </tr>
  </tbody>
</table>

- Datat to the frontend will be as follows:

```js
const users = [
  { first_name: 'Bob', last_name: 'Dylan', age: '30' },
  { first_name: 'Jane', last_name: 'Doe', age: '25' },
];
```

</li>
<li>

### using And

1. we can filter the data farther more by using <b>AND</b>

```sql
SELECT *                --  will return all rows
FROM users              --  from table users
WHERE age > 18          --  filter out rows with age value > 18
AND last_name = 'Doe'   --  only keep rows where column "last_name" has a value of 'Doe'
```

<br>
<table>
  <tbody>
    <tr>
      <td class="td">1</td>
      <td class="td">Jane</td>
      <td class="td">Doe</td>
      <td class="td">25</td>
    </tr>
  </tbody>
</table>

- Datat to the frontend will be as follows:

```js
const users = [{ first_name: 'Jane', last_name: 'Doe', age: '25' }];
```

</li>

<li>

### using LIMIT

1. we can filter specify the amount of data to receive by using <b>LIMIT</b>

   - this can be very useful in pagination.

```sql
SELECT *    -- return every columns
FROM users  -- from table users
LIMIT 2;    -- return only the first two rows
```

<br>
<table>
  <tbody>
    <tr>
      <td class="td">1</td>
      <td class="td">John</td>
      <td class="td">Doe</td>
      <td class="td">18</td>
    </tr>
    <tr>
      <td class="td">2</td>
      <td class="td">Bob</td>
      <td class="td">Dylan</td>
      <td class="td">30</td>
    </tr>
  </tbody>
</table>

- Datat to the frontend will be as follows:

```js
const users = [
  { id: 2, first_name: 'John', last_name: 'Doe', age: 18 },
  { id: 2, first_name: 'Bob', last_name: 'Dylan', age: 30 },
];
```

</li>
<li>

### using ORDER

1. <b>ORDER BY</b> is used to sort the output

- we can use <b>DESC</b> or <b>ASC</b>
- this can be useful when listing prices for example in a descent or ascend order.

```sql
SELECT *            -- return every columns
FROM users          -- from table users
ORDER BY age DESC;  -- in descending
```

<br>
<table>
  <tbody>
  <tr>
      <td class="td">2</td>
      <td class="td">Bob</td>
      <td class="td">Dylan</td>
      <td class="td">30</td>
    </tr>
    <tr>
      <td class="td">3</td>
      <td class="td">Jane</td>
      <td class="td">Doe</td>
      <td class="td">25</td>
    </tr>
    <tr>
      <td class="td">1</td>
      <td class="td">John</td>
      <td class="td">Doe</td>
      <td class="td">18</td>
    </tr>
  </tbody>
</table>

- Datat to the frontend will be as follows:

```js
const users = [
  { id: 2, first_name: 'Bob', last_name: 'Dylan', age: 30 },
  { id: 3, first_name: 'Jane', last_name: 'Doe', age: 25 },
  { id: 1, first_name: 'John', last_name: 'Doe', age: 18 },
];
```

</li>
</ul>
</section>

</main>
</body>
</html>
