const readline = require("readline");
const math = require("./math");   // importing module

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter first number: ", function(num1) {
    rl.question("Enter second number: ", function(num2) {

        let a = Number(num1);
        let b = Number(num2);

        console.log("Addition:", math.add(a, b));
        console.log("Subtraction:", math.sub(a, b));
        console.log("Multiplication:", math.mul(a, b));
        console.log("Division:", math.div(a, b));

        rl.close();
    });
});
