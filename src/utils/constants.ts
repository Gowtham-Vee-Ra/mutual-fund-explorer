/**
 * Application-wide constants
 */
export const CONSTANTS = {
    /** API endpoint base URL */
    API_BASE_URL: 'http://localhost:3000',
    
    /** Search debounce delay */
    SEARCH_DEBOUNCE_MS: 300,
    
    /** Maximum funds in comparison */
    MAX_COMPARE_FUNDS: 3,
    
    /** Error messages */
    ERRORS: {
      SEARCH_FAILED: 'Failed to fetch search results. Please try again.',
      FUND_FETCH_FAILED: 'Failed to fetch fund details. Please try again.',
      MAX_COMPARE_LIMIT: 'You can compare up to 3 funds at a time',
      ALREADY_IN_COMPARE: 'This fund is already in comparison'
    }
  };