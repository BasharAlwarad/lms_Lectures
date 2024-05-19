<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="../styles/styles.css" />
<title>OOP in JavaScript</title>
</head>
<body>
<header class="header">
<h1>OOP (Object Oriented Programming) in JavaScript</h1>
</header>
<nav class="nav">
<ul class="nav__list">
<li><a href="#Object&Encapsulation">Object & Encapsulation</a></li>
<li><a href="#WhatIsThis?">What is this?</a></li>
<li><a href="#CreatingObjects">Creating Objects</a></li>
<li><a href="#Prototypes">Prototypes</a></li>
<li><a href="#Abstraction&Inherited">Abstraction & Inherited</a></li>
<li><a href="#Classes&Polymorphism">Classes & Polymorphism</a></li>
<li><a href="#AdditionalNotes">Additional Notes</a></li>
</ul>
</nav>
<main class="main">

<section>
<strong id="Object&Encapsulation">Object & Encapsulation:</strong>
<ul>
<li>

### Why OOP?

1. Example of unorganized Data:

```js
const johnFName = 'John';
const johnLName = 'Doe';
const getJohnFullName = () => `${johnFName} ${johnLName}`;
console.log(getJohnFullName()); // Output: John Doe
```

</li>
<li>

2. Organizing Data into manageable and reusable components such as Objects.

```js
const john = {
  fName: 'John',
  lName: 'Doe',
  getFullName: () => `${john['fName']} ${john.lName}`,
};

console.log(john); // Output: { fName: 'John', lName: 'Doe', getFullName: [Function (anonymous)]}
console.log(john.fName); // Output: John
console.log(john['lName']); // Output: Doe
console.log(john.getFullName()); // Output: John Doe
```

</li>
<li>

### Encapsulation:

1. Allows data and methods to be bundled together in an object.
2. Organizing and protecting the internal workings of an object.
3. Ensuring that data state and behavior are accessed and modified only through well-defined interfaces.

```js
const john = function (fName, lName) {
  return {
    getFullName: function () {
      return `${fName} ${lName}`;
    },
    getNameAndAge: function (age) {
      return `${fName} ${lName} ${age}`;
    },
  };
};

console.log(john('John', 'Doe').getFullName()); // Output: John Doe
console.log(john('John', 'Doe').getNameAndAge('20')); // Output: John Doe 20
```

</li>
</ul>
</section>
<section>
<strong id="WhatIsThis?">What is this?</strong>
<ul>
<li>

### What is This?

1. the Window this

```js
this.location.replace('https://www.google.com'); // redirect to google
this.location.reload(); // reload the page
this.open('http://localhost:3000'); // open a new tab with the given URL
```

<li>

2. This in regular VS arrow functions.

```js
const regular = function () {
  console.log(this);
};
const arrow = () => {
  console.log(this);
};
const objFunc = {
  label: 'I am an Object',
  regular,
  arrow,
};

regular(); // Output: global object
objFunc.regular(); // Output: objFunc
arrow(); // Output: global object
objFunc.arrow(); // Output: global object
```

</li>
</li>
<li>

3. There is much more to the "this" keyword.

<br>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this">READ MORE</a>
<br>
<a href="https://javascript.info/object-methods#method-invocation-context">READ MORE</a>
<br>
<p>learn more about:

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call">

```js
call() apply() bind()
```

</a>

</p>
</li>
</ul>
</section>

<section>
<strong id="CreatingObjects">Creating Objects</strong>
<ul>
<li>

### Creating Object with the keyword Object( )

```js
const john = new Object();

john['fName'] = 'John';

john.lName = 'Doe';

john.getFullName = function () {
  return `${this['fName']} ${this['lName']}`;
};

console.log(john.getFullName()); // Output: John Doe
```

</li>
<li>

### Creating an Object using spreading & destructuring.

```js
const john = {};

john['fName'] = 'John';

john.lName = 'Doe';

john.getFullName = function () {
  return `${this['fName']} ${this['lName']}`;
};

const karl = { ...john, fName: 'Karl' };

console.log(karl.getFullName()); // Output: Karl Doe
```

</li>
<li>

### Creating Object with Constructor functions.

```js
function Person(fName, lName) {
  this.fName = fName;
  this.lName = lName;
  this.getFullName = function () {
    return `${this.fName} ${this.lName}`;
  };
}

const john = new Person('John', 'Doe');
const karl = new Person('Karl', 'Doe');

console.log(john.getFullName()); // Output: John Doe
console.log(karl.getFullName()); // Output: Karl Doe
```

</li>
</ul>
</section>

<section>
<strong id="Prototypes">Prototypes</strong>
<ul>
<li>

### Prototype property and Constructor property.

- Assigning a property to an object is exclusive to this object only.

```js
function Person(fName, lName) {
  this.fName = fName;
  this.lName = lName;
}

const john = new Person('John', 'Doe');
const karl = new Person('Karl', 'Doe');

john.getFullName = function () {
  return `${this.fName} ${this.lName}`;
};

console.log(john.getFullName()); // Output: John Doe
console.log(karl.getFullName()); // Output: TypeError: karl.getFullName is not a function
```

</li>
<li>

### Example about Prototype property and constructor property.

- while assigning a property to the prototype will have effect on every object created from that constructor.

```js
function Person(fName, lName) {
  this.fName = fName;
  this.lName = lName;
}

const john = new Person('John', 'Doe');
const karl = new Person('Karl', 'Doe');

Person.prototype.getFullName = function () {
  return `${this.fName} ${this.lName}`;
};

console.log(john.getFullName()); // Output: John Doe
console.log(karl.getFullName()); // Output: Karl Doe
```

</li>
<li>

### Adding custom methods to the JS Object.

- if everything in Js is an object, that means everything has prototype properties.
- that means we can add, delete, or alter any object prototype properties.

```js
Object.prototype.x = function () {
  console.log(this);
};

const a = '1';
const b = 1;
const c = [];
const e = true;
const d = (element) => element;

a.x(); // Output: Sting {'1'}
b.x(); // Output: Number {1}
c.x(); // Output: []
e.x(); // Output: Boolean {true}
d('Hello').x(); // Output: String{'Hello'}
```

</li>
<li>

### Changing existing method behavior in prototype chain.

```js
const numbersArr = [1, 2, 3, 4, 5, 6];

numbersArr.push(7);
console.log(numbersArr); // Output: [1, 2, 3, 4, 5, 6, 7]

Array.prototype.push = function () {
  this.reverse();
};

numbersArr.push(10);
console.log(numbersArr); // Output: [7, 6, 5, 4, 3, 2, 1]

Array.prototype.crazyFunc = function (x) {
  this.shift();
  this.pop();
  this.reverse();
  this.push(x + 1);
};

numbersArr.crazyFunc(7);
numbersArr.push(1);
console.log(numbersArr); // Output: [ 6, 5, 4, 3, 2, 8, 2 ]
```

</li>
</ul>
</section>

<section>
<strong id="Abstraction&Inherited">Abstraction & Inherited</strong>
<ul>
<li>

### Abstraction:

1. Allows to represent complex systems in a simplified manner.
2. Provides a way to create abstract models that can be easily used.
3. In JavaScript, abstraction can be achieved using classes and inheritance.

</li>
<li>

### Inheritance:

1. Allows objects to acquire properties and methods from a parent or base class.
2. Promotes code reuse, modularity, and the ability to create specialized classes.

</li>
<li>

### Example of Abstraction & Inheritance (Single-Level):

```js
const Person = function (fName, LName) {
  this.fName = fName;
  this.LName = LName;
  this.getFullName = function () {
    return `${this.fName} ${this.LName}`;
  };
};

const john = new Person('John', 'Doe');

console.log(john.getFullName()); // Output: John Deo
```

#### Let's create an Object that inherits all Person's prototypes and add something more.

```js
function Employ(fName, LName, email) {
  Person.call(this, fName, LName); // call Person's arguments by using .call

  // Person.apply(this, arguments); // Or you can use .apply( )

  this.email = email;

  this.getEmployData = function () {
    return `${this.fName} ${this.LName} ${this.email}`;
  };
}

const Micheal = new Employ('Micheal', 'James', 'MJ@google.com');

console.log(Micheal.getEmployData()); // Output: Micheal James
```

</li>
</ul>
</section>

<section>
<strong id="Classes&Polymorphism">Classes & Polymorphism</strong>
<ul>
<li>

### Polymorphism:

Allows objects of different classes to be treated as interchangeable, based on a common interface.

</li>
<li>

### Example of Polymorphism in Classes

1. #### Basic Shape class with one function that calculate the area of the shape.

```js
class Shape {
  calculateArea() {}
}
```

2. #### Rectangle is a subclass of Shape. It has it's own calculateArea( ) method.

```js
class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  calculateArea() {
    return this.width * this.height;
  }
}

const rectangle = new Rectangle(4, 5);

console.log(rectangle.calculateArea()); // Output: 20
```

3. #### Circle is also a subclass of Shape. It has it's own calculateArea( ) method.

```js
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
}

const circle = new Circle(3);

console.log(circle.calculateArea()); // Output: 28.274333882308138
```

4. #### Circumference is a subclass of Circle. It has a method to calculate the Circumference of a circle CircleCircumference( ).

```js
class Circumference extends Circle {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  circleCircumference(radius) {
    return 2 * Math.PI * radius;
  }
}

const circle = new Circle(3);

console.log(circle.circleCircumference()); // Output:  18.84954
```

</li>
<li>

### Static Properties and Methods

```js
class Person {
  constructor(fName, lName) {
    Object.assign(this, { fName, lName });
  }

  getFullName() {
    return `${this.fName} ${this.lName} `;
  }

  static workTime() {
    const hour = new Date().getHours();
    if (hour > 17 || hour < 9) {
      return 'Out of work';
    } else {
      return 'At work';
    }
  }
}

console.log(Person.workTime()); // Output: At work

const John = new Person('John', 'Doe');
console.log(John.getFullName()); // Output: John Doe
```

</li>
<li>

### Accessors Getters & Setters

1. Allow to define the behavior for accessing and modifying object properties.
2. Provide a way to control the reading and writing of object data and enable encapsulation.

```js
class Person {
  #tel; // private property
  constructor(fName, lName, tel) {
    Object.assign(this, { fName, lName });
    this.#tel = tel;
  }

  // Normal function
  getFullName() {
    return `${this.fName} ${this.lName}`;
  }

  // Getter
  get fullName() {
    return `${this.fName} ${this.lName}`;
  }

  // Setter
  set fullName(value) {
    const [fName, lName] = value.split(' ');
    this.fName = fName;
    this.lName = lName;
  }
}

const john = new Person('John', 'Doe', '0151231234');

john.fName = 'Mike';
john.tel = '4567890'; // will add a new key to the Object
john['#tel'] = 456; // will change private property directly

console.log(john); // Output: User { fName: 'Mike', lName: 'Doe', '#tel': 456 }
console.log(john.getFullName()); // Output: Mike Doe
console.log(john.fullName()); // Output: Error: john.fullName is not a function

john.fullName = 'Gorge Dwo'; // Setter: Will set the name using the setter method
console.log(john.fullName); // Gorge Dwo
```

</li>
</ul>
</section>

<section>
<strong id="AdditionalNotes">Additional Notes:</strong>
<ul>
<li>

### Shallow VS Deep copying

1. Object.assign() is a shallow copy, static method, and mutable
2. Object.create() is a deep copy, instance method, and immutable
3. Object.setPrototypeOf() is a deep copy, instance method, and mutable
4. Object.defineProperty() is a deep copy, instance method, and mutable

### Arrow functions in OOP

1. Arrow functions do not have prototype property.
2. Arrow functions do not have their own this. The value of this inside an arrow function remains the same throughout the lifecycle of the function and is always bound to the value of this in the closest non-arrow parent function.
3. Arrow functions cannot be used as constructors and will throw an error when used with new.
4. Arrow functions cannot be used as methods on objects. They cannot be used as object properties.
5. Arrow functions cannot be used as generators.
6. const f = function(){} === f(){} !== const f = ()=>{}
</li>
</ul>
</section>
</main>
</body>
</html>
