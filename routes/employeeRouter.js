import express from "express";
const router = express.Router();
import employeeController from "../api/employee.js";

router.get("/getAllEmployees", employeeController.getAllEmployees);
router.get("/getEmployeeById/:id", employeeController.employeeById);
router.get("/getEmployeeByEmail/:email", employeeController.employeeByEmail);
router.post("/addEmployee", employeeController.addEmployee);
router.post("/updateEmployee/:id", employeeController.updateEmployee);
router.delete("/deleteEmployee/:id", employeeController.deleteEmployee);
router.post("/loginEmployee", employeeController.loginEmployee);

export default router;