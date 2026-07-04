const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Todo API is running.' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/todo', todoRoutes);

app.use(errorHandler);

module.exports = app;
