
const notifyFreelancerHired = (io, freelancerId, gigTitle, budget) => {
  io.to(`user_${freelancerId}`).emit('hired', {
    message: `You have been hired for "${gigTitle}"!`,
    gigTitle,
    budget,
    timestamp: new Date()
  });
};
const notifyNewBid = (io, gigOwnerId, gigTitle, freelancerName) => {
  io.to(`user_${gigOwnerId}`).emit('newBid', {
    message: `${freelancerName} submitted a bid on "${gigTitle}"`,
    gigTitle,
    freelancerName,
    timestamp: new Date()
  });
};

const notifyBidRejected = (io, freelancerId, gigTitle) => {
  io.to(`user_${freelancerId}`).emit('bidRejected', {
    message: `Your bid on "${gigTitle}" was not selected`,
    gigTitle,
    timestamp: new Date()
  });
};

module.exports = {
  notifyFreelancerHired,
  notifyNewBid,
  notifyBidRejected
};