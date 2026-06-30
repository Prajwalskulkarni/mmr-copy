import * as employeeService from '../service/employeeService.js';
import * as departmentService from '../service/departmentService.js';

export const getAllEmployees = async (req, res) => {
    try {
        const emp = await employeeService.getAllEmployees();
        if (!emp || emp.length === 0) {
            return res.status(404).json({ error: 'No employees found' });
        }
        return res.status(200).json({ employees: emp });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const employeeById = async (req, res) => {
    try{
        const {id} = req.params;
        const emp = await employeeService.getEmployeeById(id);
        if (!emp) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        return res.status(200).json({ employee: emp });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
export const employeeByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const emp = await employeeService.getEmployeeByEmail(email);
        if (!emp) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        return res.status(200).json({ employee: emp });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const addEmployee = async (req, res) => {
    try {
        const employee = req.body;
        if (!employee.department_id || !employee.email) {
            return res.status(400).json({ error: 'Department ID and email are required' });
        }
        const department = await departmentService.getDepartmentById(employee.department_id);
        if (!department) {
            return res.status(400).json({ error: 'Invalid department ID' });
        }
        const result = await employeeService.addEmployee(employee);
        if (result) {
            return res.status(201).json({ message: 'Employee added successfully' });
        } else {
            return res.status(400).json({ error: 'Failed to add employee' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = req.body;
        const updated = await employeeService.updateEmployee(id, employee);
        if (!updated) {
            return res.status(404).json({ error: 'Employee not found or not updated' });
        }
        return res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await employeeService.deleteEmployee(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        return res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const loginEmployee = async (req, res) => {
    try {
        const { email, password } = req.body;
        const employee = await employeeService.loginEmployee(email, password);
        if (!employee) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        return res.status(200).json({ employee });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const employeeController = {
    getAllEmployees,
    employeeById,
    employeeByEmail,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    loginEmployee,
};

export default employeeController;

