const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const guestRoutes = require('./routes/guestRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check / Welcome API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: '🪔 Traditional Telugu Wedding API is running smoothly! (శుభమస్తు)',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/uptime', (req, res) => {
  res.status(200).json({
    status: 'UP',
    message: '🌺 Telugu Wedding API is alive!',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/guests', guestRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🌺 [Telugu Wedding API Server] listening on PORT: ${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api/guests`);
  console.log(`🪔 Sri Vigneshwara Prasadam: Server is Ready!`);
  console.log(`======================================================\n`);
});
