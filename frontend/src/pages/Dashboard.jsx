import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useGigs } from '../hooks/useGigs';
import { useBids } from '../hooks/useBids';
import { Briefcase, FileText, Users } from 'lucide-react';
import Card from '../components/Common/Card';
import GigList from '../components/Gigs/GigList';
import Loader from '../components/Common/Loader';
import Badge from '../components/Common/Badge';
import { formatters } from '../utils/formatters';
import { ROUTES } from '../utils/constants';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { gigs, loading: gigsLoading, fetchGigs } = useGigs();
  const { bids, loading: bidsLoading, fetchBidsForGig } = useBids();
  const [userGigs, setUserGigs] = useState([]);
  const [userBids, setUserBids] = useState([]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, navigate]);

  // Fetch gigs and bids
  useEffect(() => {
    if (isAuthenticated && user?._id) {
      fetchGigs();
    }
  }, [isAuthenticated, user?._id]);

  // Filter user's gigs and bids
  useEffect(() => {
    if (user?._id && gigs.length > 0) {
      const myGigs = gigs.filter((gig) => gig.ownerId._id === user._id);
      setUserGigs(myGigs);

      // Fetch bids for each of user's gigs
      myGigs.forEach((gig) => {
        fetchBidsForGig(gig._id);
      });
    }
  }, [user?._id, gigs]);

  // Filter user's bids
  useEffect(() => {
    if (user?._id && bids.length > 0) {
      const myBids = bids.filter((bid) => bid.freelancerId === user._id);
      setUserBids(myBids);
    }
  }, [user?._id, bids]);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  // Stats
  const stats = [
    {
      label: 'Posted Gigs',
      value: userGigs.length,
      icon: Briefcase,
      color: 'blue',
    },
    {
      label: 'Active Bids',
      value: userBids.filter((b) => b.status === 'pending').length,
      icon: FileText,
      color: 'green',
    },
    {
      label: 'Hired Projects',
      value: userBids.filter((b) => b.status === 'hired').length,
      icon: Users,
      color: 'purple',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-lg text-gray-600">
          Here's your project dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            purple: 'bg-purple-100 text-purple-600',
          };

          return (
            <Card key={index} shadow>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
                  <Icon size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* My Gigs Section */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Gigs</h2>
          <p className="text-gray-600 mt-1">
            {userGigs.length} posted
          </p>
        </div>
        {gigsLoading ? (
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        ) : (
          <GigList gigs={userGigs} loading={false} emptyMessage="You haven't posted any gigs yet" />
        )}
      </div>

      {/* My Bids Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Bids</h2>
          <p className="text-gray-600 mt-1">
            {userBids.length} total bids
          </p>
        </div>
        {bidsLoading ? (
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        ) : userBids.length > 0 ? (
          <Card>
            <div className="space-y-4">
              {userBids.map((bid) => (
                <div key={bid._id} className="pb-4 border-b border-gray-200 last:border-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {bid.gigId?.title || 'Gig'}
                      </p>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {bid.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Submitted {formatters.relativeTime(bid.createdAt)}
                      </p>
                    </div>
                    <Badge status={bid.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card>
            <div className="text-center py-8">
              <FileText size={40} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">No bids yet. Start bidding on gigs!</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;