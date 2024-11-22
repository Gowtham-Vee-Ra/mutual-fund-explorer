/**
 * Represents a complete mutual fund data structure
 * Contains all available information about a fund
 */
export interface Fund {
    /** Full name of the fund */
    name: string;
    /** Unique security identifier */
    secid: string;
    /** Trading symbol */
    ticker: string;
    /** Whether the fund tracks an index */
    isIndexFund: boolean;
    /** Total assets under management */
    fundSizeInUSD: number;
    /** Annual management fee percentage */
    managementFee: number;
    /** Fund category classification */
    globalCategory: string;
    /** Total number of securities in portfolio */
    numberOfHoldings: number;
    /** Fund management company name */
    managementCompany: string;
    /** Morningstar rating (1-5) */
    morningstarRating: number;
    /** Detailed investment strategy description */
    investmentStrategy: string;
    /** Total expense ratio percentage */
    prospectusNetExpense: number;
    /** Broad investment category */
    globalBroadCategoryGroup: string;
  }
  
  /**
   * Represents a basic search result
   * Used in the search dropdown
   */
  export interface SearchResult {
    ticker: string;
    name: string;
  }
 