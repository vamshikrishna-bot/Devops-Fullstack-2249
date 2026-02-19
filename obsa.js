const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON

// In-memory book storage
let books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho", price: 399 },
    { id: 2, title: "Atomic Habits", author: "James Clear", price: 499 }
];

let nextId = 3;

// 🔹 GET - Fetch all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});


// 🔹 POST - Add new book
app.post('/books', (req, res) => {
    const { title, author, price } = req.body;

    // Validation
    if (!title || !author || !price) {
        return res.status(400).json({
            message: "Title, author and price are required"
        });
    }

    const newBook = {
        id: nextId++,
        title,
        author,
        price
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});


// 🔹 PUT - Update book
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, author, price } = req.body;

    // Update only provided fields
    if (title) book.title = title;
    if (author) book.author = author;
    if (price) book.price = price;

    res.status(200).json({
        message: "Book updated successfully",
        book
    });
});


// 🔹 DELETE - Delete book
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(bookIndex, 1);

    res.status(200).json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});


// Start server
app.listen(3000, () => {
    console.log("Online Bookstore API running on port 3000");
});
