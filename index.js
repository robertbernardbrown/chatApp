const { createServer } = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const config = require('./config');
const cors = require('cors');

const PORT = process.env.PORT || config.port;

app.use(cors());

// Create HTTP server
const httpServer = createServer(app);

// Initialize Socket.IO with CORS enabled
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'], // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
    credentials: true // Allow credentials
  }
});
// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Add more event handlers as needed
});

// Start the server
httpServer.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

module.exports = { app, io };