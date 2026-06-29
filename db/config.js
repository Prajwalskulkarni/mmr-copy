import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const database = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'employeemanegmentnode',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const checkConnection = async () => {
  let connection;
  try {
    connection = await database.getConnection();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

export { database, checkConnection };