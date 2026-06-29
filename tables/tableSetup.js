import { database } from '../db/config.js';

const employeeTable = `CREATE TABLE IF NOT EXISTS employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  position VARCHAR(255) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  password VARCHAR(255) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);`;

const departmentTable = `CREATE TABLE IF NOT EXISTS department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);`;

const tableSetup = async (table, query) => {
  try {
    await database.query(query);
    console.log(`Table ${table} created successfully`);
  } catch (error) {
    console.error(`Error creating table ${table}:`, error);
  }
};

const createTable = async () => {
  await tableSetup('department', departmentTable);
  await tableSetup('employee', employeeTable);
  console.log('All tables created successfully');
};

export { createTable };