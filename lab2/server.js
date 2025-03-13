require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
    seedDatabase();
}).catch(err => console.error('Could not connect to MongoDB', err));

const employeeSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    surname: String,
    roomNumber: Number,
    department: String,
    computer: {
        brand: String,
        model: String,
        specs: {
            cpu: String,
            ram: String,
            storage: String
        }
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

async function getNextId() {
    const lastEmployee = await Employee.findOne().sort({ id: -1 });
    return lastEmployee ? lastEmployee.id + 1 : 1;
}

async function seedDatabase() {
    const count = await Employee.countDocuments();
    if (count === 0) {
        await Employee.insertMany([
            { id: 1, surname: 'Петров', roomNumber: 101, department: 'IT', computer: { brand: 'Dell', model: 'XPS 15', specs: { cpu: 'Intel i7', ram: '16GB', storage: '512GB SSD' } } },
            { id: 2, surname: 'Іваненко', roomNumber: 202, department: 'HR', computer: { brand: 'HP', model: 'EliteBook 840', specs: { cpu: 'Intel i5', ram: '8GB', storage: '256GB SSD' } } },
            { id: 3, surname: 'Сидорчук', roomNumber: 303, department: 'Finance', computer: { brand: 'Apple', model: 'MacBook Pro', specs: { cpu: 'M1', ram: '16GB', storage: '512GB SSD' } } },
            { id: 4, surname: 'Коваленко', roomNumber: 404, department: 'Marketing', computer: { brand: 'Lenovo', model: 'ThinkPad T14', specs: { cpu: 'AMD Ryzen 7', ram: '16GB', storage: '1TB SSD' } } },
            { id: 5, surname: 'Мельник', roomNumber: 505, department: 'Sales', computer: { brand: 'Asus', model: 'ZenBook 14', specs: { cpu: 'Intel i7', ram: '16GB', storage: '512GB SSD' } } }
        ]);
        console.log('Database seeded with initial employees');
    }
}

app.post('/employees', async (req, res) => {
    try {
        const { surname, roomNumber, department, computer } = req.body;
        if (!surname || !roomNumber || !department || !computer) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newId = await getNextId();
        const newEmployee = new Employee({ id: newId, surname, roomNumber, department, computer });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findOne({ id: parseInt(req.params.id) });
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findOneAndUpdate({ id: parseInt(req.params.id) }, req.body, { new: true });
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findOneAndDelete({ id: parseInt(req.params.id) });
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});