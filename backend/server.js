const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cron = require('node-cron');
const Task = require('./models/Task');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v2/auth', require('./routes/authRoutes'));
app.use('/api/v2/tasks', require('./routes/taskRoutes'));
app.use('/api/v2/inventory', require('./routes/inventoryRoutes'));
app.use('/api/v2/sops', require('./routes/sopRoutes'));
app.use('/api/v2/orders', require('./routes/orderRoutes'));
app.use('/api/v2/performance', require('./routes/performanceRoutes'));
app.use('/api/v2/hr', require('./routes/hrRoutes'));

// Cron job to update overdue tasks every hour
cron.schedule('0 * * * *', async () => {
  try {
    const now = new Date();
    await Task.updateMany(
      { status: { $ne: 'Completed' }, deadline: { $lt: now } },
      { $set: { status: 'Overdue' } }
    );
    console.log('Overdue tasks updated');
  } catch (error) {
    console.error('Cron job error:', error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
