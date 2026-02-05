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