const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Khai báo router
const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);
const bookingRoutes = require('./routes/bookings');
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', require('./routes/auth'));


// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
