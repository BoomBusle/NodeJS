const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let employees = [
    { id: 1, surname: 'Іваненко', roomNumber: 101, department: 'HR', computer: 'Dell XPS' },
    { id: 2, surname: 'Петренко', roomNumber: 202, department: 'IT', computer: 'MacBook Pro' },
    { id: 3, surname: 'Сидоренко', roomNumber: 303, department: 'Finance', computer: 'Lenovo ThinkPad' },
    { id: 4, surname: 'Коваленко', roomNumber: 404, department: 'Marketing', computer: 'HP EliteBook' },
    { id: 5, surname: 'Мельник', roomNumber: 505, department: 'Sales', computer: 'Asus ZenBook' }
];
let idCounter = 6;

app.post('/employees', (req, res) => {
    const { surname, roomNumber, department, computer } = req.body;
    if (!surname || !roomNumber || !department || !computer) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const newEmployee = { id: idCounter++, surname, roomNumber, department, computer };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

app.get('/employees', (req, res) => {
    res.json(employees);
});

app.get('/employees/:id', (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
});

app.put('/employees/:id', (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    
    const { surname, roomNumber, department, computer } = req.body;
    if (surname) employee.surname = surname;
    if (roomNumber) employee.roomNumber = roomNumber;
    if (department) employee.department = department;
    if (computer) employee.computer = computer;
    
    res.json(employee);
});

app.delete('/employees/:id', (req, res) => {
    const index = employees.findIndex(emp => emp.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Employee not found' });
    
    employees.splice(index, 1);
    res.json({ message: 'Employee deleted' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});