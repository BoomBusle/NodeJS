const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employees.controller.js");
const { employeeByIdValidation } = require("../middlewares/employee.middleware.js");

router.get("/", employeeController.getEmployees);
router.get("/:id", employeeByIdValidation, employeeController.getEmployee);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeByIdValidation, employeeController.updateEmployee);
router.delete("/:id", employeeByIdValidation, employeeController.deleteEmployee);

module.exports = router;
