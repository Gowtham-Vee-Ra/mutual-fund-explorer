/**
 * SearchBar Component
 * 
 * Provides real-time search functionality with:
 * - Autocomplete dropdown
 * - Keyboard navigation
 * - Loading states
 * - Error handling
 */
import React, { ChangeEvent, KeyboardEvent } from 'react';
import { Search, X, AlertCircle } from 'lucide-react';
import { SearchResult } from '../types';

interface SearchBarProps {
  searchQuery: string;
  isLoading: boolean;
  error: string;
  results: SearchResult[];
  selectedIndex: number;
  isOpen: boolean;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onSelectFund: (ticker: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  isLoading,
  error,
  results,
  selectedIndex,
  isOpen,
  onSearchChange,
  onKeyDown,
  onClear,
  onSelectFund,
}) => {
  return (
    <div className="relative w-full">
      {/* Search Input Field */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          onKeyDown={onKeyDown}
          placeholder="Search for mutual funds..."
          className="w-full p-4 pr-12 rounded-lg border dark:border-gray-600 
                    dark:bg-gray-800 dark:text-white focus:outline-none 
                    focus:ring-2 focus:ring-blue-500"
          aria-label="Search mutual funds"
        />
        
        {/* Search Controls (Clear & Search Icon) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          {searchQuery && (
            <button
              onClick={onClear}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
              aria-label="Clear search"
            >
              <X className="w-4 h-4 dark:text-white" />
            </button>
          )}
          <Search className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 rounded-lg 
                       shadow-lg border dark:border-gray-600 max-h-96 overflow-y-auto z-50">
          {/* Loading State */}
          {isLoading && (
            <div className="p-4 text-center dark:text-white">Loading...</div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-4 text-center text-red-500 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}

          {/* No Results State */}
          {!isLoading && !error && results.length === 0 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No results found
            </div>
          )}

          {/* Results List */}
          {!isLoading && !error && results.length > 0 && results.map((result, index) => (
            <div
              key={result.ticker}
              onClick={() => onSelectFund(result.ticker)}
              className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 
                ${index === selectedIndex ? 'bg-gray-100 dark:bg-gray-700' : ''}
                ${index !== results.length - 1 ? 'border-b dark:border-gray-600' : ''}`}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <div className="font-medium dark:text-white">{result.ticker}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{result.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;