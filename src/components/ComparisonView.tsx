/**
 * ComparisonView Component
 * 
 * Displays a side-by-side comparison of multiple funds:
 * - Key metrics comparison
 * - Visual indicators
 * - Remove functionality
 */
import React from 'react';
import { X } from 'lucide-react';
import { Fund } from '../types';
import { formatters } from '../utils/formatters';

interface ComparisonViewProps {
  funds: Fund[];
  onRemoveFund: (ticker: string) => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ funds, onRemoveFund }) => {
  // Format number utility function
  const formatNumber = (value: number): string => 
    new Intl.NumberFormat('en-US').format(value);

  // Define comparison metrics
  const comparisonRows = [
    {
      label: 'Fund Name',
      getValue: (fund: Fund) => fund.name
    },
    {
      label: 'Management Company',
      getValue: (fund: Fund) => fund.managementCompany
    },
    {
      label: 'Fund Size',
      getValue: (fund: Fund) => formatters.currency(fund.fundSizeInUSD)
    },
    {
      label: 'Management Fee',
      getValue: (fund: Fund) => formatters.percentage(fund.managementFee)
    },
    {
      label: 'Net Expense Ratio',
      getValue: (fund: Fund) => formatters.percentage(fund.prospectusNetExpense)
    },
    {
      label: 'Number of Holdings',
      getValue: (fund: Fund) => formatNumber(fund.numberOfHoldings)
    },
    {
      label: 'Morningstar Rating',
      getValue: (fund: Fund) => (
        <div className="text-yellow-500">
          {formatters.stars(fund.morningstarRating)}
        </div>
      )
    },
    {
      label: 'Fund Type',
      getValue: (fund: Fund) => fund.isIndexFund ? 'Index Fund' : 'Actively Managed'
    },
    {
      label: 'Category',
      getValue: (fund: Fund) => fund.globalCategory
    }
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Fund Comparison</h3>
        
        <table className="w-full min-w-[600px]">
          {/* Table Header */}
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="text-left p-2 dark:text-gray-300">Metric</th>
              {funds.map(fund => (
                <th key={fund.ticker} className="text-left p-2">
                  <div className="flex items-center justify-between">
                    <span className="dark:text-gray-300">{fund.ticker}</span>
                    <button
                      onClick={() => onRemoveFund(fund.ticker)}
                      className="text-gray-500 hover:text-red-500 dark:text-gray-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {comparisonRows.map(row => (
              <tr key={row.label} className="border-b dark:border-gray-700">
                <td className="p-2 text-gray-600 dark:text-gray-400">{row.label}</td>
                {funds.map(fund => (
                  <td key={fund.ticker} className="p-2 dark:text-white">
                    {row.getValue(fund)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonView;