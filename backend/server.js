const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const cron = require('node-cron');
const Tenant = require('./models/Tenant');
const Payment = require('./models/Payment');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tenants', require('./routes/tenants'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/maintenance', require('./routes/maintenance'));
app.use('/api/leases', require('./routes/leases'));
app.use('/api/messages', require('./routes/messages'));

// Socket.IO for real-time chat
io.on('connection', (socket) => {
  socket.on('join', (tenantId) => {
    socket.join(tenantId);
  });
  socket.on('sendMessage', async (data) => {
    const message = new Message({ ...data, createdAt: new Date() });
    await message.save();
    io.to(data.tenantId).emit('message', message);
  });
});

// Auto-reminder for pending payments (runs daily)
cron.schedule('0 0 * * *', async () => {
  const tenants = await Tenant.find();
  const payments = await Payment.find();
  tenants.forEach(async (tenant) => {
    const lastPayment = payments.find(p => p.tenantId.toString() === tenant._id.toString());
    if (!lastPayment || new Date() - new Date(lastPayment.date) > 30 * 24 * 60 * 60 * 1000) {
      console.log(`Reminder: Rent due for ${tenant.name}`);
      // In production, send email or notification
    }
  });
});

server.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));