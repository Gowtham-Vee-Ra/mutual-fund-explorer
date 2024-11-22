/**
 * Utility functions for formatting data
 * Provides consistent formatting across the application
 */
export const formatters = {
    /**
     * Formats currency values to billions/millions
     * @example formatters.currency(1500000000) // "$1.50B"
     */
    currency: (value: number): string => {
      if (value >= 1e9) {
        return `$${(value / 1e9).toFixed(2)}B`;
      }
      return `$${(value / 1e6).toFixed(2)}M`;
    },
  
    /**
     * Formats numbers as percentages
     * @example formatters.percentage(0.156) // "15.60%"
     */
    percentage: (value: number): string => `${value.toFixed(2)}%`,
  
    /**
     * Creates star rating display
     * @example formatters.stars(3) // "★★★☆☆"
     */
    stars: (rating: number): string => '★'.repeat(rating) + '☆'.repeat(5 - rating),
  
    /**
     * Formats numbers with commas
     * @example formatters.number(1000000) // "1,000,000"
     */
    number: (value: number): string => 
      new Intl.NumberFormat('en-US').format(value)
  };