/*
//TASK-1:  This script adds two numbers and prints the result to the console
let num1 = 5;
let num2 = 10;
let sum = num1 + num2;
console.log(sum); // Output: 15

// TASK-2:  Modify the script to print a more descriptive message
console.log("The sum of " + num1 + " and " + num2 + " is " + sum);

// TASK-3: Variable creation
let result = num1 + num2;
console.log("Result: " + result);

// TASK-4:  Array Creation
let numbers = [num1, num2];
console.log("Array of numbers: " + numbers);

// TASK-5:  Function Creation
function addNumbers(a, b) {
    return a + b;
}
let functionResult = addNumbers(num1, num2);
console.log("Sum using function: " + functionResult);


//create a empty array
let emptyArray = [];
//initializing values to the array
emptyArray.push(num1);
emptyArray.push(num2);
console.log("Initialized Array: " + emptyArray);
//print the length of the array
console.log("Length of the array: " + emptyArray.length);
//Do Arthematic Operations
let difference = num2 - num1;
let product = num1 * num2;
let quotient = num2 / num1;
console.log("Difference: " + difference);
console.log("Product: " + product);
console.log("Quotient: " + quotient);
//print the values of the array
console.log("Values in the array: " + emptyArray);




//Create a ATM simulation(withdraw and deposit functions) user
let balance = 1000;
function withdraw(amount) {
    if (amount <= balance) {
        balance -= amount;
        console.log("Withdrawal successful. Remaining balance: " + balance);
    } else {
        console.log("Insufficient funds.");
    }
}
function deposit(amount) {
    balance += amount;
    console.log("Deposit successful. Current balance: " + balance);
}
withdraw(200);
deposit(150);   


//Create Student results based on marks give pass or fail
function checkResults(marks) {
    if (marks >= 40) {
        console.log("Pass");
    } else {
        console.log("Fail");
    }
}
checkResults(60);
checkResults(29); */

//Arithmetic operations using functions
/*function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mul(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}

// Calling functions
let a = 10
let b = 20

console.log("Addition:", add(a, b));
console.log("Subtraction:", sub(a, b));
console.log("Multiplication:", mul(a, b));
console.log("Division:", div(a, b)); */


