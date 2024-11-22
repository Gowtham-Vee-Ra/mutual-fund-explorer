/**
 * FundDisplay Component
 * 
 * Displays detailed information about a selected mutual fund:
 * - Fund details and metrics
 * - Loading states
 * - Error handling
 * - Compare functionality
 */
import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Fund } from '../types';
import { formatters } from '../utils/formatters';

interface FundDisplayProps {
  fund: Fund | null;
  isLoading: boolean;
  error: string;
  onClear: () => void;
  onAddToCompare: (fund: Fund) => void;
}

const FundDisplay: React.FC<FundDisplayProps> = ({
  fund,
  isLoading,
  error,
  onClear,
  onAddToCompare,
}) => {
  // Loading State
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="text-center py-8 dark:text-white">Loading fund information...</div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="text-center py-8 text-red-500 flex items-center justify-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      </div>
    );
  }

  // Empty State
  if (!fund) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Search and select a mutual fund to view details
        </div>
      </div>
    );
  }

  // Fund Details Display
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold dark:text-white">{fund.ticker}</h2>
          <p className="text-gray-600 dark:text-gray-400">{fund.name}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onAddToCompare(fund)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md 
                     hover:bg-blue-600 transition-colors"
          >
            Compare
          </button>
          <button
            onClick={onClear}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Fund Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Management Company */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Management Company
          </div>
          <div className="font-medium dark:text-white">
            {fund.managementCompany}
          </div>
        </div>

        {/* Fund Size */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Fund Size
          </div>
          <div className="font-medium dark:text-white">
            {formatters.currency(fund.fundSizeInUSD)}
          </div>
        </div>

        {/* Fund Type */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Fund Type
          </div>
          <div className="font-medium dark:text-white">
            {fund.isIndexFund ? 'Index Fund' : 'Actively Managed'}
          </div>
        </div>

        {/* Global Category */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Global Category
          </div>
          <div className="font-medium dark:text-white">
            {fund.globalCategory}
          </div>
        </div>
      </div>

      {/* Fees Section */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold dark:text-white">Fees</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Management Fee
            </div>
            <div className="font-medium dark:text-white">
              {formatters.percentage(fund.managementFee)}
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Net Expense Ratio
            </div>
            <div className="font-medium dark:text-white">
              {formatters.percentage(fund.prospectusNetExpense)}
            </div>
          </div>
        </div>
      </div>

      {/* Investment Strategy Section */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold dark:text-white">
          Investment Strategy
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {fund.investmentStrategy}
        </p>
      </div>
    </div>
  );
};

export default FundDisplay;