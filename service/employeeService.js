import {database} from '../db/config.js';

export const getAllEmployees = async () => {
    const [rows] = await database.query("SELECT * FROM employee");
    return rows;
};

export const getEmployeeById = async (id) => {
    const [rows] = await database.query("SELECT * FROM employee WHERE id = ?", [id]);
    return rows[0];
};

export const getEmployeeByEmail = async (email) => {
    const [rows] = await database.query(
        'SELECT * FROM employee WHERE email = ?',
        [email]
    );
    return rows[0];
};

export const updateEmployee = async (id, employee) => {
    const { name, email, position, salary, password, department_id } = employee;
    const [result] = await database.query(
        'UPDATE employee SET name = ?, email = ?, position = ?, salary = ?, password = ?, department_id = ? WHERE id = ?',
        [name, email, position, salary, password, department_id, id]
    );
    return result.affectedRows > 0;
};

export const addEmployee = async (employee) => {
    const { name, email, position, salary, password, department_id } = employee;
    const [result] = await database.query(
        'INSERT INTO employee (name, email, position, salary, password, department_id) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, position, salary, password, department_id]
    );
    return result.affectedRows > 0;
};

export const loginEmployee = async (email, password) => {
    const [rows] = await database.query("SELECT * FROM employee WHERE email = ? AND password = ?", [email, password]);
    return rows[0];
};

export const deleteEmployee = async (id) => {
    const [result] = await database.query('DELETE FROM employee WHERE id = ?', [id]);
    return result.affectedRows > 0;
};



