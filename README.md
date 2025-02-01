# AeroGlobe Grocery Combo Selector

## Overview

This grocery combo selector app is my implementation for the AeroGlobe's Take Home Test.

Live Preview: https://bilalmuhammad41.github.io/aeroglobe-tht-muhammad-bilal/
## Features

- **Dynamic Filtering:** Users can select any item first, and the remaining options adjust accordingly.
- **Redux State Management:** Implements Redux for state management.
- **Static Data Fetching:** The combo data is fetched from an external JSON resource.
- **Unique List Rendering:** Each category (chips, drinks, chocolates) displays only unique items.
- **Reset Selection:** Users can reset their selection at any time to start over.

## Technologies Used

- React 18
- TypeScript
- Redux Toolkit
- Vite (for fast development & build process)
- ESLint (for code linting)

## Installation & Running Locally

### Prerequisites

Ensure you have **Node.js** installed (preferably v16+).

### Steps to Run the Project

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-repo/aeroglobe-tht-muhammad-bilal.git
   cd aeroglobe-tht-muhammad-bilal
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the development server:**

   ```sh
   npm run dev
   ```

   The app will be available at `http://localhost:5173/` (or a different port if specified by Vite).

4. **Build the project:**

   ```sh
   npm run build
   ```

   The build files will be available in the `dist/` directory.

5. **Run ESLint for code quality checks:**

   ```sh
   npm run lint
   ```

## Project Structure

```
/public
  /api
    ├── data           # Static JSON data for combos
/src
  ├── components      # Reusable React components
  ├── store          # Redux store configuration
  /styles
    ├── combo           # Styles for combo components.
  ├── App.tsx        # Main application component
  ├── main.tsx       # React entry point
  ├── index.css      # Global styles (if any)
```

## How to Use

1. **Select an item (Chips, Drink, or Chocolate) first.**
2. **The remaining options will filter dynamically** based on valid combos.
3. **Continue selecting until a full combo is made.**
4. **The selected combo will be displayed.**
5. **Click "Clear" to start over.**

