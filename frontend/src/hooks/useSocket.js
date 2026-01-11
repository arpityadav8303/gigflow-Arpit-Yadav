import { useEffect } from 'react';
import socketService from '../services/socketService';

export const useSocket = (userId, callbacks) => {
  useEffect(() => {
    if (!userId) return;

    // Initialize socket
    const socket = socketService.init();

    // Join user room for notifications
    socketService.joinUserRoom(userId);

    // Listen for hired notification
    if (callbacks?.onHired) {
      socketService.onHired(callbacks.onHired);
    }

    // Listen for new bid notification
    if (callbacks?.onNewBid) {
      socketService.onNewBid(callbacks.onNewBid);
    }

    // Listen for bid rejected notification
    if (callbacks?.onBidRejected) {
      socketService.onBidRejected(callbacks.onBidRejected);
    }

    // Cleanup
    return () => {
      if (callbacks?.onHired) socketService.off('hired');
      if (callbacks?.onNewBid) socketService.off('newBid');
      if (callbacks?.onBidRejected) socketService.off('bidRejected');
    };
  }, [userId, callbacks]);

  return {
    emit: socketService.emit,
    getSocket: socketService.getSocket,
  };
};