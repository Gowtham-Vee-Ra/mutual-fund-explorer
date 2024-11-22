/**
 * MutualFundSearch Component
 * 
 * Main container component that:
 * - Manages global application state
 * - Handles API calls
 * - Coordinates child components
 * - Manages dark mode
 */
import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { debounce } from 'lodash';
import { Fund, SearchResult } from '../types';
import { CONSTANTS } from '../utils/constants';
import SearchBar from './SearchBar';
import FundDisplay from './FundDisplay';
import FundVisualizations from './FundVisualizations';
import CompareFunds from './CompareFunds';

const MutualFundSearch: React.FC = () => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Initialize from localStorage if available
    return localStorage.getItem('darkMode') === 'true';
  });
  
  // Search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  
  // Fund states
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [isLoadingFund, setIsLoadingFund] = useState<boolean>(false);
  const [fundError, setFundError] = useState<string>('');
  
  // Comparison state
  const [comparedFunds, setComparedFunds] = useState<Fund[]>([]);
  
  // Refs
  const searchRef = useRef<HTMLDivElement>(null);

  // Persist dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle clicks outside search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Debounced search function
   * Makes API call after user stops typing
   */
  const debouncedSearch = debounce(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setError('');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${CONSTANTS.API_BASE_URL}/api/funds/search?query=${query}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Search error:', err);
      setError(CONSTANTS.ERRORS.SEARCH_FAILED);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, CONSTANTS.SEARCH_DEBOUNCE_MS);

  /**
   * Fetches detailed fund information
   */
  const fetchFundDetails = async (ticker: string) => {
    setIsLoadingFund(true);
    setFundError('');

    try {
      const response = await fetch(
        `${CONSTANTS.API_BASE_URL}/api/funds/${ticker}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSelectedFund(data);
    } catch (err) {
      console.error('Fund details error:', err);
      setFundError(CONSTANTS.ERRORS.FUND_FETCH_FAILED);
      setSelectedFund(null);
    } finally {
      setIsLoadingFund(false);
    }
  };

  // Event Handlers

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsOpen(true);
    debouncedSearch(query);
  };

  const handleSelectFund = (ticker: string) => {
    fetchFundDetails(ticker);
    setSearchQuery('');
    setIsOpen(false);
    setResults([]);
  };

  const handleAddToCompare = (fund: Fund) => {
    if (comparedFunds.length >= CONSTANTS.MAX_COMPARE_FUNDS) {
      alert(CONSTANTS.ERRORS.MAX_COMPARE_LIMIT);
      return;
    }
    if (comparedFunds.some(f => f.ticker === fund.ticker)) {
      alert(CONSTANTS.ERRORS.ALREADY_IN_COMPARE);
      return;
    }
    setComparedFunds([...comparedFunds, fund]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelectFund(results[selectedIndex].ticker);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleRemoveFund = (ticker: string) => {
    setComparedFunds(comparedFunds.filter(f => f.ticker !== ticker));
  };

  const handleClearAllFunds = () => {
    setComparedFunds([]);
  };

  return (
    <div className={`min-h-screen p-4 transition-colors ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold dark:text-white">
            Mutual Fund Search
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="dark:text-white" />
            ) : (
              <Moon />
            )}
          </button>
        </div>

        {/* Search Section */}
        <div ref={searchRef} className="mb-8">
          <SearchBar
            searchQuery={searchQuery}
            isLoading={isLoading}
            error={error}
            results={results}
            selectedIndex={selectedIndex}
            isOpen={isOpen}
            onSearchChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onClear={() => {
              setSearchQuery('');
              setResults([]);
            }}
            onSelectFund={handleSelectFund}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fund Information and Visualization */}
          <div className="space-y-6">
            <FundDisplay
              fund={selectedFund}
              isLoading={isLoadingFund}
              error={fundError}
              onClear={() => setSelectedFund(null)}
              onAddToCompare={handleAddToCompare}
            />
            
            {selectedFund && (
              <FundVisualizations fund={selectedFund} />
            )}
          </div>

          {/* Comparison Section */}
          <div className="space-y-6">
            <CompareFunds
              onAddFund={handleAddToCompare}
              comparedFunds={comparedFunds}
              onRemoveFund={handleRemoveFund}
              onClearAll={handleClearAllFunds}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutualFundSearch;