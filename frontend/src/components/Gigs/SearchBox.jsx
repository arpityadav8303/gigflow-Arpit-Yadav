import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import Button from '../Common/Button';
import { debounce } from '../../utils/helpers';

const SearchBar = ({ onSearch, onFilter, loading = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const debouncedSearch = debounce((query) => {
    onSearch(query);
  }, 500);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setSelectedFilter(filter);
    onFilter(filter);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search gigs by title..."
            value={searchQuery}
            onChange={handleSearchChange}
            disabled={loading}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filter Select */}
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          disabled={loading}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Gigs</option>
          <option value="open">Open Only</option>
          <option value="assigned">Assigned Only</option>
        </select>
      </div>

      {/* Results Info */}
      {searchQuery && (
        <div className="mt-3 text-sm text-gray-600">
          Searching for: <span className="font-medium">"{searchQuery}"</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;