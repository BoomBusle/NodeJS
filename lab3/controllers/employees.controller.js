const employeeService = require("../services/employees.service.js");
const Employee = require("../models/employee.model.js");

const getEmployees = (req, res) => {
    res.json(employeeService.getAllEmployees());
};
const getEmployee = (req, res) => {
    const employee = employeeService.getEmployeeById(req.params.id);
    employee ? res.json(employee) : res.status(404).json({ error: "Employee not found" });
};
const createEmployee = (req, res) => {
    const { lastName, roomNumber, department, computer } = req.body;
    const newEmployee = new Employee(employees.length + 1, lastName, roomNumber, department, computer);
    res.status(201).json(employeeService.addEmployee(newEmployee));
};
const updateEmployee = (req, res) => {
    const updatedEmployee = employeeService.updateEmployee(req.params.id, req.body);
    updatedEmployee ? res.json(updatedEmployee) : res.status(404).json({ error: "Employee not found" });
};
const deleteEmployee = (req, res) => {
    const deleted = employeeService.deleteEmployee(req.params.id);
    deleted ? res.json({ message: "Employee deleted" }) : res.status(404).json({ error: "Employee not found" });
};

module.exports = { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee };