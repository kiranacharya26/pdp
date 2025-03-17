# My React App

This project is a React application that implements a content filter with pricing options using Tailwind CSS for styling. It allows users to filter content based on selected pricing options and reset their selections.

## Features

- Content filtering based on pricing options (Paid, Free, View Only)
- Reset button to clear selected filters
- Data fetching from a specified API
- Responsive design using Tailwind CSS

## Project Structure

```
my-react-app
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── Filter.js
│   │   ├── PricingOption.js
│   │   └── ResetButton.js
│   ├── pages
│   │   └── HomePage.js
│   ├── App.js
│   ├── index.js
│   └── styles
│       └── tailwind.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my-react-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and go to `http://localhost:3000` to view the application.

## Technologies Used

- React
- Tailwind CSS
- JavaScript
- Axios (for data fetching)

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.