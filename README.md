# Mutual Fund Explorer

## 📋 Assessment Requirements Implementation

### Technical Requirements ✅

#### Required Technologies
- **React + TypeScript** ✓
  ```typescript
  // Implemented using Create React App with TypeScript
  npx create-react-app mutual-fund-explorer --template typescript
  ```
- **Mock Mutual Fund API Integration** ✓
  ```typescript
  // API endpoints integrated
  GET /api/funds/search?query={searchTerm}
  GET /api/funds/{ticker}
  ```

#### Core Features Implementation

##### 1. Stock Symbol Search Bar ✓
```typescript
// Features implemented:
- Controlled input component
- Debounced API calls (300ms delay)
- Clear button functionality
- Results dropdown with loading states
- Error handling
- Selection handling
- Outside click handling
```

##### 2. Search Results Dropdown ✓
- Display matching stocks with symbols and names
- No results state handling
- Loading indicator
- Error state management
- Selection via click
- Auto-collapse functionality
- Keyboard navigation (↑/↓/Enter/Esc)

##### 3. Stock Information Display ✓
Required information displayed:
- Ticker symbol
- Fund name
- Morningstar rating
- Investment strategy
- Global category

##### 4. UI Requirements ✓
- Light/Dark mode toggle
- Mobile-responsive design
- Consistent styling system

## 🚀 Enhanced Features

### 1. Advanced Data Visualization
```typescript
// Enhanced display features:
- Interactive fee structure charts
- Visual rating system
- Holdings visualization
- Fund size indicators
```

### 2. Comparison Functionality
Built a comprehensive comparison system:
- Compare up to 3 funds simultaneously
- Side-by-side metric comparison
- Quick add/remove functionality
- Bulk clear option
- Persistent comparison state

### 3. Enhanced UI/UX Features
- Advanced loading states
- Detailed error messages
- Accessibility features
- Smooth transitions

## 🛠️ Technical Implementation

### Project Structure
```
mutual-fund-explorer/
├── src/
│   ├── components/
│   │   ├── SearchBar.tsx          # Search functionality
│   │   ├── FundDisplay.tsx        # Fund information display
│   │   ├── FundVisualizations.tsx # Data visualization
│   │   ├── ComparisonView.tsx     # Comparison display
│   │   ├── CompareFunds.tsx       # Comparison management
│   │   └── MutualFundSearch.tsx   # Main container
│   ├── types/
│   │   └── index.ts               # TypeScript definitions
│   ├── utils/
│   │   ├── constants.ts           # Application constants
│   │   └── formatters.ts          # Data formatting utilities
│   └── App.tsx                    # Root component
```

### Core Technologies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^4.9.5",
    "lodash": "^4.17.21",
    "lucide-react": "^0.263.1",
    "recharts": "^2.10.3",
    "tailwindcss": "^3.3.2"
  }
}
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14+)
- npm (v6+)

### Installation

1. **Clone Repositories**
```bash
# Main application
git clone [your-repo-url]
cd mutual-fund-explorer

# Mock API
git clone https://github.com/LoVasco/mock-mutual-fund-api
```

2. **Setup Mock API**
```bash
cd mock-mutual-fund-api
npm install
npm start
# Runs on http://localhost:3000
```

3. **Setup Main Application**
```bash
cd ../mutual-fund-explorer
npm install
npm start
# Runs on http://localhost:3001
```

## 🎯 Key Features Breakdown

### 1. Search Implementation
```typescript
// Debounced search with error handling
const debouncedSearch = debounce(async (query: string) => {
  if (!query.trim()) return;
  try {
    const response = await fetch(`${API_URL}/funds/search?query=${query}`);
    // Implementation details...
  } catch (error) {
    // Error handling...
  }
}, 300);
```

### 2. Comparison System
```typescript
// Compare multiple funds
interface ComparisonViewProps {
  funds: Fund[];
  onRemoveFund: (ticker: string) => void;
  onClearAll: () => void;
}
```

### 3. Data Visualization
```typescript
// Chart implementation with Recharts
<BarChart data={feeData} layout="vertical">
  <XAxis type="number" />
  <YAxis dataKey="name" type="category" />
  <Tooltip />
  <Bar dataKey="value" fill="#4F46E5" />
</BarChart>
```

## 🔧 Configuration

### Tailwind Setup
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      // Custom configurations
    }
  }
}
```

## 💡 Usage Examples

### Search and Select
```typescript
// Example search implementation
const handleSearch = async (query: string) => {
  if (!query.trim()) return;
  // Implementation details...
};
```

### Fund Comparison
```typescript
// Add fund to comparison
const handleAddToCompare = (fund: Fund) => {
  if (comparedFunds.length >= MAX_COMPARE_FUNDS) {
    alert('Maximum comparison limit reached');
    return;
  }
  // Implementation details...
};
```

## 🎨 Styling Guide

### Dark Mode Implementation
```typescript
// Toggle dark mode
const toggleDarkMode = () => {
  setIsDarkMode(!isDarkMode);
  document.documentElement.classList.toggle('dark');
};
```

## 🔍 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🚀 Deployment

```bash
# Build for production
npm run build
```


---

**Note**: This implementation showcases both the required features from the assessment and additional enhancements to create a more comprehensive mutual fund search experience.