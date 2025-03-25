const createError = require("http-errors");
const Joi = require("joi");
const employeeService = require("../services/employees.service");

async function employeeByIdValidation(req, res, next) {
    try {
        const { employeeId } = req.params;

        if (!employeeId || isNaN(employeeId)) {
            throw createError.BadRequest("ID співробітника не є валідним");
        }

        const employee = await employeeService.findById(employeeId);
        if (!employee) {
            throw createError.NotFound("Співробітника з таким ID не знайдено");
        }
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    employeeByIdValidation,
};