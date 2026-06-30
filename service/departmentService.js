import {database} from '../db/config.js';

export const getAllDepartments = async () => {
    const [rows] = await database.execute('SELECT * FROM departments');
    return rows;
};

export const getDepartmentById = async (id) => {
    const [rows] = await database.execute('SELECT * FROM departments WHERE id = ?', [id]);
    return rows[0];
};
