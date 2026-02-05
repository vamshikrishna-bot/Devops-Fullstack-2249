//Simple hello world program:
console.log("Hello World from Node.js");

//Read Input from User (Terminal)
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
rl.question("Enter your name: ", (name) => {
console.log("Hello " + name);
rl.close();
});

//Arthimatic operations
let a = 10, b = 5;
console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);


//Check Even or Odd (Terminal Input)
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
rl.question("Enter a number: ", (num) => {
if (num % 2 === 0)
console.log("Even Number");
else
console.log("Odd Number");
rl.close();
});

//Factorial of a Number
function factorial(n) {
let fact = 1;
for (let i = 1; i <= n; i++) {
fact *= i;
}
return fact;
}
console.log("Factorial:", factorial(5));

//Simple Calculator Using Node.js
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
rl.question("Enter two numbers: ", (input) => {
let [a, b] = input.split(" ").map(Number);
console.log("Add:", a + b);
console.log("Sub:", a - b);
console.log("Mul:", a * b);
console.log("Div:", a / b);
rl.close();
});

//Display Current Date and Time
const date = new Date();
console.log("Current Date & Time:", date.toLocaleString());
