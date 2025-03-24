const employees = require("../helpers/mock-data.js");

const getAllEmployees = () => employees;
const getEmployeeById = (id) => employees.find(emp => emp.id === parseInt(id));
const addEmployee = (employee) => {
    employees.push(employee);
    return employee;
};
const updateEmployee = (id, newData) => {
    const index = employees.findIndex(emp => emp.id === parseInt(id));
    if (index !== -1) {
        employees[index] = { ...employees[index], ...newData };
        return employees[index];
    }
    return null;
};
const deleteEmployee = (id) => {
    const index = employees.findIndex(emp => emp.id === parseInt(id));
    if (index !== -1) {
        return employees.splice(index, 1);
    }
    return null;
};

module.exports = { getAllEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee };