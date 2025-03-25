const Joi = require("joi");

const EmployeeCreateSchema = Joi.object({
    lastName: Joi.string().min(2).max(50).required(),
    roomNumber: Joi.number().integer().min(100).max(999).required(),
    department: Joi.string().valid("IT", "HR", "Finance", "Marketing", "Sales").required(),
    computer: Joi.string().valid("Dell", "HP", "Lenovo", "Apple", "Asus", "Acer").required(),
});

const EmployeeUpdateSchema = Joi.object({
    lastName: Joi.string().min(2).max(50),
    roomNumber: Joi.number().integer().min(100).max(999),
    department: Joi.string().valid("IT", "HR", "Finance", "Marketing", "Sales"),
    computer: Joi.string().valid("Dell", "HP", "Lenovo", "Apple", "Asus", "Acer"),
});

module.exports = {
    EmployeeCreateSchema,
    EmployeeUpdateSchema,
};