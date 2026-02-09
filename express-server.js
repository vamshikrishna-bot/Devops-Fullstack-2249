const express = require('express');
const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// One product (simple app)
let product = {
    name: "Notebook",
    price: 50
};

let cartCount = 0;

/* ---------- FRONTEND ---------- */
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Simple App</title>
    <style>
        body {
            font-family: Arial;
            background: #f2f2f2;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            width: 300px;
            text-align: center;
            box-shadow: 0 0 10px #ccc;
        }
        button {
            padding: 10px;
            margin-top: 10px;
            background: blue;
            color: white;
            border: none;
            cursor: pointer;
        }
    </style>
</head>
<body>

<div class="card">
    <h2>${product.name}</h2>
    <p>Price: ₹${product.price}</p>
    <button onclick="buy()">Buy</button>
    <p id="count">Items in cart: 0</p>
</div>

<script>
    function buy() {
        fetch('/buy', { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                document.getElementById('count').innerText =
                    'Items in cart: ' + data.cartCount;
            });
    }
</script>

</body>
</html>
    `);
});

/* ---------- BACKEND ---------- */
app.post('/buy', (req, res) => {
    cartCount++;
    res.json({ cartCount });
});

// Start server
app.listen(PORT, () => {
    console.log(`Simple app running at http://localhost:${PORT}`);
});
