let message: string = "hello world";
console.log(message);

const nameTS = 'Phong';
console.log("length =", nameTS.length);
console.log('Uppercase =', nameTS.toUpperCase());

let age: number = 25;
let pi: number = 3.14;

let isStudent: boolean = true;

let nullValue: null = null;
let undefinedValue: undefined = undefined;

let sym1: symbol = Symbol("key1");
let sym2: symbol = Symbol("key2");

let bigIntValue: bigint = 100n;

let anyValue: any = "Hello, world!";

let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: string[] = ["apple", "banana", "orange"];
let colors: Array<string> = ["red", "green", "blue"];
let mixedArray: (number | string)[] = [1, "two", 3, "four"];
let emptyArray: number[] = [];
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

let diverseArray: Array<number | string | boolean> = [1, "two", true];

let dynamicValue: any = 5;
console.log(dynamicValue);

dynamicValue = "Hello, world!";
console.log(dynamicValue);

dynamicValue = true;
console.log(dynamicValue);

function sayHello(): void {
  console.log("Hello!");
}

function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string, greeting?: string): string {
  if (greeting) {
      return `${greeting}, ${name}!`;
  } else {
      return `Hello, ${name}!`;
  }
}

function exponentiate(base: number, power: number = 2): number {
  return Math.pow(base, power);
}

function concatenateStrings(...args: string[]): string {
  return args.join(" ");
}

function fetchData(callback: (data: string) => void): void {
  const data = "Data from server";
  callback(data);
}

function identity<T>(arg: T): T {
  return arg;
}

type Person = {
    name: string;
    age: number;
};

const person: Person = {
    name: "John",
    age: 30
};


class Animal {
  name: string;

  constructor(name: string) {
      this.name = name;
  }

  makeSound() {
      console.log("Some generic sound");
  }
}

const cat = new Animal("Cat");
cat.makeSound();
console.log(cat.name);


class Dog extends Animal {
  constructor(name: string) {
      super(name);
  }

  makeSound() {
      console.log("Woof! Woof!");
  }
}

const dog = new Dog("Dog");
dog.makeSound();
console.log(dog.name);

class Bird extends Animal {
  constructor(name: string) {
      super(name);
  }

  makeSound() {
      console.log("Tweet! Tweet!");
  }
}

function animalSound(animal: Animal) {
  animal.makeSound();
}

const bird = new Bird("Sparrow");
animalSound(bird);


class Counter {
  private count: number = 0;

  increment() {
      this.count++;
  }

  getCount() {
      return this.count;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.getCount());

var x: number = 10;
var y: string = "Hello";
var z: boolean = true;


function example() {
    if (true) {
        var localVar: number = 20;
    }
    console.log(localVar);
}

example();

let a: number = 5;
let b: string = "World";
let c: boolean = false;

if (true) {
    let blockVar: number = 30;
    console.log(blockVar);
}

const PI: number = 3.14;
const GREETING: string = "Hello";

if (true) {
    const blockConst: number = 42;
    console.log(blockConst); 
}

