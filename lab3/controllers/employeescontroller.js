const employees = require("../helpers/meta");

const getEmployees = (req, res) => {
  res.json(employees);
};

const getEmployeeById = (req, res) => {
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));
  employee ? res.json(employee) : res.status(404).json({ error: "Співробітника не знайдено" });
};

const addEmployee = (req, res) => {
  const newEmployee = { id: employees.length + 1, ...req.body };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
};

const updateEmployee = (req, res) => {
  const index = employees.findIndex(emp => emp.id === parseInt(req.params.id));
  if (index !== -1) {
    employees[index] = { ...employees[index], ...req.body };
    res.json(employees[index]);
  } else {
    res.status(404).json({ error: "Співробітника не знайдено" });
  }
};

const deleteEmployee = (req, res) => {
  const index = employees.findIndex(emp => emp.id === parseInt(req.params.id));
  if (index !== -1) {
    employees.splice(index, 1);
    res.json({ message: "Співробітника видалено" });
  } else {
    res.status(404).json({ error: "Співробітника не знайдено" });
  }
};

module.exports = { getEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee };