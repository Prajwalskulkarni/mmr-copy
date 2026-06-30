import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createTable } from './tables/tableSetup.js';
import {department} from './api/department.js'
import employeeRouter from './routes/employeeRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});
app.use('/api', department);
app.use('/api', employeeRouter);


async function startServer() {
  await createTable();
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
