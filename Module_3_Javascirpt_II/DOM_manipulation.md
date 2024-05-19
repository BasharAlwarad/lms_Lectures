<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="../styles/styles.css" />
<title>DOM in javascript</title>
</head>
<body>
<header class="header">
<h1>DOM (Document Object Module) in JavaScript</h1>
</header>
<nav class="nav">
<ul class="nav__list">
<li><a href="#DOMIntro">DOM Intro</a></li>
<li><a href="#AccessingDOMElements">Accessing DOM Elements</a></li>
<li><a href="#ManipulatingDOMElements">Manipulating DOM Elements</a></li>
<li><a href="#EventHandling">Event Handling</a></li>
</ul>
</nav>
<main class="main">

<section>
<strong id="DOMIntro">DOM Intro:</strong>
<ul>
<li>

### Why DOM?

1. Before Dom:

- we had to work with HTML as a string and manipulate it using functions like <code>document.write()</code>
- no way of accessing or modifying the elements once they were created

2. After Dom:

- We can access each element on the page individually.
  <br> Example: <code>document.getElementsByTagName("div");
  </code>
- provides more security to our HTML.
- Dynamic web development.

### DOM Tree Structure:

1. Nodes:

- what is Document?

```js
console.log(Window.prototype);
console.log(window);
console.log(Document.prototype);
console.log(document);
console.log(document.childNodes);
console.log(document.documentElement);
```

- Element Nodes: Represent HTML elements like.

```html
<html>, <head>, <title>, <body>, <header>, <h1>, <nav>, <ul>, <li>, <a>, <p>,
```

- Attribute Nodes: Attributes belong to element nodes. For example:

```html
lang="en" href="#home" id="user" class="bg-red-600"
```

2. DOM tree

- this function will return a collection of all child nodes.

```js
function listAllElements(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    console.log(node.tagName);
  }

  node.childNodes.forEach((childNode) => {
    listAllElements(childNode);
  });
}
listAllElements(document.documentElement);
```

</li>
</ul>
</section>

<section>
<strong id="AccessingDOMElements">Accessing DOM Elements:</strong>
<ul>
<li>

### DOM Methods

1. Accessing the DOM:

```js
document.getElementById('logo'); // return one element by ID
document.getElementsByClassName('container'); // get many elements by the class name
document.getElementsByTagName('li'); // return array of all <li> elements in the document
document.querySelector('#logo'); // return the first element that matches the selector
document.querySelector('.container'); // return the first element that matches the selector
document.querySelector('li'); // return the first element that matches the tag name
document.querySelectorAll('#logo'); //  returns array of elements with the given Id
document.querySelectorAll('.container'); // returns array of elements with the given class
document.querySelectorAll('li'); // returns array of elements with the given tag name
document.getElementsByName('contact'); // returns array of elements with the given name attribute
```

2. DOM traversal:

- <code>parentNode</code> : Returns the parent node of the current element.

<br> HTML:

```html
<div id="parent">
  <p>Child element</p>
</div>
```

Javascript:

```js
const paragraph = document.querySelector('p');
const parentDiv = paragraph.parentNode;
console.log(parentDiv.id); // Output: parent
```

- <code>childNodes</code> : Returns array of children node of the current element.

<br> HTML:

```html
<ul id="parentList">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

Javascript:

```js
const parentList = document.getElementById('parentList');
const children = parentList.childNodes;
children.forEach((child) => {
  console.log(child.textContent);
});
```

- <code>nextSibling</code> or <code>previousSibling</code> : Returns a sibling node of the current element.

<br> HTML:

```html
<ul>
  <li>Item 1</li>
  <li id="target">Item 2</li>
  <li>Item 3</li>
</ul>
```

Javascript:

```js
const target = document.getElementById('target');
const previousSibling = target.previousElementSibling;
const nextSibling = target.nextElementSibling;
console.log(previousSibling.textContent); // Output: Item 1
console.log(nextSibling.textContent); // Output: Item 3
```

</li>
</ul>
</section>
<section>
<strong id="ManipulatingDOMElements">Manipulating DOM Elements:</strong>
<ul>
<li>

### Elements Properties

1. Manipulating properties:

- Manipulates the HTML content inside an element.

<br>HTML:

```html
<div id="example"></div>
```

JavaScript:

```js
const div = document.getElementById('example');
div.innerHTML = '<p>Hello, world!</p>';
```

- Manipulates the text content of an element, excluding HTML markup.

<br>HTML:

```html
<div id="example">
  <p>Hello, <strong>world</strong>!</p>
</div>
```

JavaScript:

```js
const div = document.getElementById('example');
div.innerText = 'Goodbye, world!';
```

- Manipulates the text content of an element, including all HTML markup as text.

<br>HTML:

```html
<div id="example">
  <p>Hello, <strong>world</strong>!</p>
</div>
```

JavaScript:

```js
const div = document.getElementById('example');
div.textContent = 'Goodbye, <strong>world</strong>!';
```

- Manipulates CSS styles of an element.

<br>HTML:

```html
<div id="example"></div>
```

JavaScript:

```js
const div = document.getElementById('example');
div.style.color = 'red';
div.style.backgroundColor = 'lightblue';
```

- Manipulates the class attribute of an element.

<br>HTML:

```html
<div id="example" class="box"></div>
```

JavaScript:

```js
const div = document.getElementById('example');
div.className += ' newClass';
```

- Manipulates the id attribute of an element.

<br>HTML:

```html
<div id="example"></div>
```

JavaScript:

```js
const div = document.getElementById('example');
div.id = 'newId';
```

</li>
</ul>
</section>
<section>
<strong id="EventHandling">Event Handling:</strong>
<ul>
<li>

### Elements Properties

#### Events are actions or occurrences that happen in the system, which can be triggered by users or the system itself.

1. Attaching Event Listeners with addEventListener:

<br>HTML:

```html
<button id="myButton">Click me</button>
```

JavaScript:

```js
const button = document.getElementById('myButton');
button.addEventListener('click', function () {
  alert('Button clicked!');
});
```

2. Common Event Types:

<br>HTML:

```html
<button id="myButton">Click me</button>
```

JavaScript:

```js
const div = document.getElementById('myDiv');
div.addEventListener('mouseover', function () {
  console.log('Mouse over the div');
});
```

3. Event Object:

- When an event occurs, an event object is automatically passed to the event handler function. This object contains information about the event and its context, such as the target element, event type, mouse coordinates, etc.

<br>HTML:

```html
<input type="text" id="myInput" />
```

JavaScript:

```js
const input = document.getElementById('myInput');
input.addEventListener('keydown', function (event) {
  console.log('Key pressed:', event.key);
});
```

</li>
</ul>
</section>
</main>
</body>
</html>
