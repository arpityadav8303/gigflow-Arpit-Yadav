import React, { createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import socketService from '../services/socketService';
import toast from 'react-hot-toast';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated && user) {
            const socket = socketService.init();

            // Authenticate socket
            socket.emit('user:login', user.id);

            // Global listeners
            socketService.onNewBid((data) => {
                toast.success(`New Bid: ${data.freelancerName} bid ₹${data.price} on "${data.gigTitle}"`, {
                    duration: 5000,
                    position: 'top-right',
                    style: {
                        border: '1px solid #4ade80',
                        padding: '16px',
                        color: '#1f2937',
                    },
                });
            });

            socketService.onHired((data) => {
                toast.success(`Congratulations! You were hired for "${data.gigTitle}"`, {
                    duration: 6000,
                    icon: '🎉',
                });
            });

            return () => {
                socketService.disconnect();
            };
        }
    }, [isAuthenticated, user]);

    return (
        <SocketContext.Provider value={socketService}>
            {children}
        </SocketContext.Provider>
    );
};