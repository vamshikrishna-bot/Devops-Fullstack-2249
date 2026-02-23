const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());  // Middleware

// ----------------------
// MongoDB Connection
// ----------------------
mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
.then(() => console.log("MongoDB Connected Successfully"))
.catch(err => console.log("Connection Error:", err));

// ----------------------
// Schema & Model
// ----------------------
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    }
});

const Student = mongoose.model('Student', studentSchema);

// ----------------------
// RESTful API Operations
// ----------------------

// 1️⃣ CREATE
app.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        const savedStudent = await student.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 2️⃣ READ ALL
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3️⃣ READ BY ID
app.get('/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student)
            return res.status(404).json({ message: "Student Not Found" });

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4️⃣ UPDATE (PUT)
app.put('/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedStudent)
            return res.status(404).json({ message: "Student Not Found" });

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 5️⃣ PARTIAL UPDATE (PATCH)
app.patch('/students/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedStudent)
            return res.status(404).json({ message: "Student Not Found" });

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 6️⃣ DELETE
app.delete('/students/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);

        if (!deletedStudent)
            return res.status(404).json({ message: "Student Not Found" });

        res.status(200).json({ message: "Student Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ----------------------
// Start Server
// ----------------------
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});