<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="../styles/styles.css" />
<title>NodeJs</title>
</head>
<body>
<header class="header">
<h1>NODEJS</h1>
</header>
<nav class="nav">
<ul class="nav__list">
<li><a href="#NodeIntro">Node Intro</a></li>
<li><a href="#StartingWithNodejs">Starting With Nodejs</a></li>
<li><a href="#NodeModules">Node Modules</a></li>
<li><a href="#ServerAndNodeJs">Server And NodeJs</a></li>
</ul>
</nav>
<main class="main">

<section>
<strong id="NodeIntro">Node Intro:</strong>
<ul>
<li>

### History of Nodejs?

1. What is Node.js?

- Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser.
- It uses the V8 JavaScript engine, developed by Google for Chrome, which compiles JavaScript directly to native machine code.
- Node.js allows developers to run JavaScript on the server-side, enabling them to build scalable network applications and handle I/O-heavy (Input/Output) operations efficiently. I/O (Input/Output)

2. History of Node

- Node.js was created by Ryan Dahl in 2009 and was initially released in 2010.
- One of the key innovations of Node.js was its event-driven, non-blocking I/O model, which made it highly efficient for handling concurrent connections.
- Node.js quickly gained popularity among developers and has since grown into a vibrant ecosystem with a large community and extensive library of modules.

3.  Features and Advantages

- Asynchronous and Event-Driven: performs tasks concurrently without blocking other operations.
- Single-threaded: simplifying development while leveraging asynchronous I/O operations for efficiency.
- Rich Ecosystem: vast collection of packages and libraries via npm
- Cross-Platform: runs on various operating systems
- Scalable: handles many concurrent connections, making it suitable for building scalable applications

</li>
</ul>
</section>
<section>
<strong id="StartingWithNodejs">Starting with Nodejs:</strong>
<ul>
<li>

### installing and versions

<a href="https://www.nodejs.tech/de/download">
<button>Download NodeJs</button>
</a> Note: download the LTS version

### Node and the Terminal

- checkout your node version: <b>node -v</b>
- run a javascript file using node : <b>node filename.js</b>

```bash
node index.js
```

### JS Modules

Everything is an object in JavaScript, so you can use it to create modules!
A module is simply a Javascript file that contains functions or objects which can be exported for other files to use.

- use when exporting <b>module.exports</b>

```js
module.exports = someFunction;
module.exports = someObject;
```

<hr>

- use when importing <b>require</b>

```js
const { name } = require('./person');
var person = require('./person');
const utils = require('./utils.js');
require('./utils.js');
```

</li>
  </ul>
  </section>
<section>
<strong id="NodeModules">Node Modules:</strong>
<ul>
<li>

### Node Modules

- node docs <a href="http://nodejs.org/api/modules.html"><button>check out the docs</button></a>

- the global object in js is window
- Node.js provides its own set of global objects that are available in any Node.js script. Examples:

  - process: object provides information about the current Node.js process, such as environment variables, command-line arguments,
  - console: object provides methods for writing to the standard output (stdout) and standard error (stderr) streams
  - \_\_ dirname: returns directory containing the current module (file).
  - \_\_ filename: variable contains the absolute path to the current JavaScript file.

### Os Module in node

The os module exports a bunch of operating system related things. It's built into node and doesn't need to be installed separately like other modules

- using os with node

```js
const os = require('os');

// Get information about the current operating system
console.log('OS platform:', os.platform());
console.log('OS type:', os.type());
console.log('OS release:', os.release());
console.log('CPU architecture:', os.arch());

// Get information about CPU cores
console.log('Number of CPU cores:', os.cpus().length);

// Get information about memory
console.log('Total memory (bytes):', os.totalmem());
console.log('Free memory (bytes):', os.freemem());

// Prints the percentage of free system memory
console.log(
  'Percentage of free memory:',
  (os.freemem() / os.totalmem()) * 100 + '%'
);
```

- package json
  - npm i nodemon -D
  - npm i nodemon -g

```json
{
  "scripts": {
    "start": "node --watch index.js",
    "dev": "nodemon index.js",
    "list-files": "ls"
  }
}
```

- import vs require. mjs or type: module in package.json

```js
export function someFunction() {}

export const someObject = {};
```

- export one as default

```js
export default function someFunction() {
  }

const someObject = {
  };

export default someObject;

```

- export many as default

```js
export function someFunction() {}

const someObject = {};

export default { someFunction, someObject };
```

- import

```js
import someFunction from './functionFile';
import someObject from './objectFile';
```

- import destructuring

```js
import { someFunction, someObject } from './someFile';
```

### nodejs and data

- Node "fs" and text data

```js
const fs = require('fs');

// Reading from a file
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

// Writing to a file
const contentToWrite = 'This is some content to write to the file.';
fs.writeFile('newFile.txt', contentToWrite, 'utf8', (err) => {
  if (err) {
    console.error('Error writing to file:', err);
    return;
  }
  console.log('File written successfully.');
});

// Appending to a file
const additionalContent = '\nThis content is appended to the file.';
fs.appendFile('newFile.txt', additionalContent, 'utf8', (err) => {
  if (err) {
    console.error('Error appending to file:', err);
    return;
  }
  console.log('Content appended successfully.');
});

// Checking if a file exists
fs.access('example.txt', fs.constants.F_OK, (err) => {
  if (err) {
    console.error('File does not exist:', err);
    return;
  }
  console.log('File exists.');
});

// Creating a directory
fs.mkdir('newDirectory', (err) => {
  if (err) {
    console.error('Error creating directory:', err);
    return;
  }
  console.log('Directory created successfully.');
});

// Removing a file
fs.unlink('example.txt', (err) => {
  if (err) {
    console.error('Error deleting file:', err);
    return;
  }
  console.log('File deleted successfully.');
});
```

- Node "fs" and Object data

```js
const fs = require('fs');

// Example JavaScript object
const myObject = {
  name: 'John Doe',
  age: 30,
  city: 'Hannover',
};

// Serialize the object to JSON string
const jsonString = JSON.stringify(myObject);

// Writing the JSON string to a file
fs.writeFile('data.json', jsonString, 'utf8', (err) => {
  if (err) {
    console.error('Error writing to file:', err);
    return;
  }
  console.log('Data written to file successfully.');
});

// Reading the JSON string from the file and deserializing it back to an object
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Parse the JSON string back to an object
  const parsedObject = JSON.parse(data);
  console.log('Parsed data:', parsedObject);
});
```

</li>
  </ul>
  </section>
<section>
<strong id="ServerAndNodeJs">Server and NodeJs:</strong>
<ul>
<li>

### installing a package module

- lodash

```js
// Import the lodash package
const _ = require('lodash');

// Example usage of lodash functions
const numbers = [1, 2, 3, 4, 5];
const sum = _.sum(numbers);
console.log('Sum of numbers:', sum);
```

</li>
  </ul>
  </section>
<section>
<strong id="ServerAndNodeJs">Server and NodeJs:</strong>
<ul>
<li>

### Creating a server using http module

- server returning a string

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
```

- server returning a Json object

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  const responseJSON = { message: 'Hello World' };

  res.end(JSON.stringify(responseJSON));
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
```

- CORS: Cross-Origin Resource Sharing.

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  res.writeHead(200, { 'Content-Type': 'application/json' });

  const responseJSON = { message: 'Hello World' };
  res.end(JSON.stringify(responseJSON));
});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
```

</li>
  </ul>
  </section>
  </main>
  </body>
  </html>
