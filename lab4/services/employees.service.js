const employees = require("../helpers/mock-data.js");

const getAllEmployees = () => employees;

const findById = (id) => employees.find(emp => emp.id === parseInt(id));

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
        return employees.splice(index, 1)[0];
    }
    return null;
};

module.exports = { getAllEmployees, findById, addEmployee, updateEmployee, deleteEmployee };