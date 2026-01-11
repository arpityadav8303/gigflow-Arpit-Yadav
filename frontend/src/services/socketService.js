import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket = null;

const socketService = {
  // Initialize socket connection
  init: () => {
    if (!socket) {
      socket = io(SOCKET_URL, {
        withCredentials: true,
      });

      socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
    }
    return socket;
  },

  // Get socket instance
  getSocket: () => {
    if (!socket) {
      return socketService.init();
    }
    return socket;
  },

  // Join user room
  joinUserRoom: (userId) => {
    if (socket) {
      socket.emit('join', userId);
    }
  },

  // Listen for hired notification
  onHired: (callback) => {
    if (socket) {
      socket.on('hired', callback);
    }
  },

  // Listen for new bid notification
  onNewBid: (callback) => {
    if (socket) {
      socket.on('newBid', callback);
    }
  },

  // Listen for bid rejected notification
  onBidRejected: (callback) => {
    if (socket) {
      socket.on('bidRejected', callback);
    }
  },

  // Remove event listener
  off: (eventName) => {
    if (socket) {
      socket.off(eventName);
    }
  },

  // Disconnect socket
  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  // Emit custom event
  emit: (eventName, data) => {
    if (socket) {
      socket.emit(eventName, data);
    }
  },
};

export default socketService;