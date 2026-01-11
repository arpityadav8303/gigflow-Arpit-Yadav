import React, { useEffect } from 'react';
import { useGigs } from '../hooks/useGigs';
import SearchBar from '../components/Gigs/SearchBox';
import GigList from '../components/Gigs/GigList';

const GigsFeed = () => {
  const { gigs, loading, error, searchQuery, fetchGigs, searchGigs } = useGigs();

  // Fetch gigs on mount
  useEffect(() => {
    fetchGigs();
  }, []);

  const handleSearch = (query) => {
    if (query.trim()) {
      searchGigs(query);
    } else {
      fetchGigs();
    }
  };

  const handleFilter = (filter) => {
    // Filter logic can be added here
    console.log('Filter:', filter);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Browse Gigs
        </h1>
        <p className="text-lg text-gray-600">
          Find the perfect freelancer for your project
        </p>
      </div>

      {/* Search & Filter */}
      <SearchBar onSearch={handleSearch} onFilter={handleFilter} loading={loading} />

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Gigs List */}
      <GigList
        gigs={gigs}
        loading={loading}
        error={error}
        emptyMessage={
          searchQuery
            ? `No gigs found for "${searchQuery}"`
            : 'No gigs available at the moment'
        }
      />
    </div>
  );
};

export default GigsFeed;