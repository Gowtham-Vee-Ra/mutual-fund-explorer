/**
 * CompareFunds Component
 * 
 * Manages the fund comparison interface:
 * - Shows selected funds
 * - Handles removing funds
 * - Displays comparison view
 */
import React from 'react';
import { Fund } from '../types';
import ComparisonView from './ComparisonView';

interface CompareFundsProps {
  onAddFund: (fund: Fund) => void;
  comparedFunds: Fund[];
  onRemoveFund: (ticker: string) => void;
  onClearAll: () => void;
}

const CompareFunds: React.FC<CompareFundsProps> = ({
  onAddFund,
  comparedFunds,
  onRemoveFund,
  onClearAll
}) => {
  return (
    <div className="space-y-4">
      {/* Selected Funds Display */}
      {comparedFunds.length > 0 && (
        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium dark:text-white">
              Comparing {comparedFunds.length} {comparedFunds.length === 1 ? 'fund' : 'funds'}
            </span>
            <button
              onClick={onClearAll}
              className="text-sm text-red-600 hover:text-red-800 dark:text-red-400"
            >
              Clear all
            </button>
          </div>
          {/* Fund Tags */}
          <div className="flex flex-wrap gap-2">
            {comparedFunds.map(fund => (
              <div
                key={fund.ticker}
                className="bg-white dark:bg-gray-600 px-2 py-1 rounded flex items-center gap-2"
              >
                <span className="text-sm dark:text-white">{fund.ticker}</span>
                <button
                  onClick={() => onRemoveFund(fund.ticker)}
                  className="text-gray-500 hover:text-red-500 dark:text-gray-400"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Comparison View */}
      {comparedFunds.length > 0 && (
        <ComparisonView
          funds={comparedFunds}
          onRemoveFund={onRemoveFund}
        />
      )}
    </div>
  );
};

export default CompareFunds;