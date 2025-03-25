const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employees.controller.js");
const { employeeByIdValidation } = require("../middlewares/employee.middleware.js");
const { EmployeeCreateSchema, EmployeeUpdateSchema } = require("../validations/employee.validation.js");

const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};

router.get("/", employeeController.getEmployees);
router.get("/:employeeId", employeeByIdValidation, employeeController.getEmployee);
router.post("/", validateRequest(EmployeeCreateSchema), employeeController.createEmployee);
router.put("/:employeeId", employeeByIdValidation, validateRequest(EmployeeUpdateSchema), employeeController.updateEmployee);
router.delete("/:employeeId", employeeByIdValidation, employeeController.deleteEmployee);

module.exports = router;