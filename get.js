const express = require('express');
const app = express();

const students = [
  { id: 1, name: "Vamshi", age: 21 },
  { id: 2, name: "Krishna", age: 22 }
];

// GET all students
app.get('/students', (req, res) => {
  res.json(students);
});

// GET student by ID
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  res.json(student);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
