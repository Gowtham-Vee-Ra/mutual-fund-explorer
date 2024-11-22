/**
 * FundVisualizations Component
 * 
 * Provides visual representations of fund data:
 * - Fee structure charts
 * - Fund metrics displays
 * - Rating visualizations
 */
import React from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Fund } from '../types';
import { formatters } from '../utils/formatters';

interface FundVisualizationsProps {
  fund: Fund;
}

const FundVisualizations: React.FC<FundVisualizationsProps> = ({ fund }) => {
  // Prepare fee data for chart
  const feeData = [
    {
      name: 'Management Fee',
      value: fund.managementFee
    },
    {
      name: 'Net Expense Ratio',
      value: fund.prospectusNetExpense
    }
  ];

  return (
    <div className="space-y-6">
      {/* Fund Overview Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Fund Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Fund Size Display */}
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="text-sm text-gray-600 dark:text-gray-400">Fund Size</div>
            <div className="text-lg font-semibold dark:text-white">
              {formatters.currency(fund.fundSizeInUSD)}
            </div>
          </div>
          {/* Fund Type Display */}
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="text-sm text-gray-600 dark:text-gray-400">Type</div>
            <div className="text-lg font-semibold dark:text-white">
              {fund.isIndexFund ? 'Index Fund' : 'Actively Managed'}
            </div>
          </div>
        </div>
      </div>

      {/* Fee Structure Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Fee Structure</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={feeData} layout="vertical">
              <XAxis 
                type="number" 
                domain={[0, Math.max(...feeData.map(d => d.value)) * 1.2]}
                tickFormatter={formatters.percentage}
              />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip formatter={(value) => formatters.percentage(value as number)} />
              <Bar dataKey="value" fill="#4F46E5" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rating and Holdings Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Morningstar Rating */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">
            Morningstar Rating
          </h3>
          <div className="text-2xl text-yellow-500 text-center mt-4">
            {formatters.stars(fund.morningstarRating)}
          </div>
        </div>
        {/* Holdings Count */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Holdings</h3>
          <div className="text-3xl font-bold text-center mt-4 dark:text-white">
            {formatters.number(fund.numberOfHoldings)}
          </div>
          <div className="text-sm text-center text-gray-600 dark:text-gray-400">
            Total Securities
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundVisualizations;