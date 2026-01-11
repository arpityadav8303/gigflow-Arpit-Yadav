import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, TrendingUp, ArrowRight } from 'lucide-react';
import Button from '../components/Common/Button';
import { ROUTES } from '../utils/constants';

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Connect with Top Freelancers
            </h1>
            <p className="text-xl text-gray-600">
              Post your project, receive bids from qualified freelancers, and hire the best talent for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={ROUTES.GIGS_FEED}>
                <Button variant="primary" size="lg">
                  Browse Gigs
                </Button>
              </Link>
              <Link to={ROUTES.CREATE_GIG}>
                <Button variant="outline" size="lg">
                  Post a Gig
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-12 h-96 flex items-center justify-center">
              <div className="text-center">
                <Briefcase size={80} className="text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Find your perfect match</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Simple, secure, and fast project completion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Post Your Project
              </h3>
              <p className="text-gray-600">
                Describe your project and set your budget. It takes just a few minutes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Receive Bids
              </h3>
              <p className="text-gray-600">
                Qualified freelancers will submit proposals for your project.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hire & Collaborate
              </h3>
              <p className="text-gray-600">
                Choose the best freelancer and get your project done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of clients who have successfully completed their projects with GigFlow.
          </p>
          <Link to={ROUTES.GIGS_FEED}>
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Explore Gigs Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;