# LetMeGrab - E-Commerce Platform

LetMeGrab is a modern e-commerce platform built with React and Material-UI, offering a seamless shopping experience with features like product browsing, user authentication, and responsive design.

## Features

- 🛍️ **Product Management**
  - Browse products with images and details
  - Search and filter products by category
  - Responsive product grid with loading states
  - Product details view

- 🔐 **User Authentication**
  - Secure login and signup functionality
  - Protected routes for authenticated users
  - Persistent user sessions

- 🎨 **Modern UI/UX**
  - Clean and responsive design
  - Material-UI components
  - Loading skeletons for better UX
  - Smooth animations and transitions

- 🔍 **Search & Filter**
  - Real-time product search
  - Category-based filtering
  - Empty state handling
  - Clear filters option

## Tech Stack

- **Frontend**
  - React
  - Vite
  - Material-UI
  - React Router
  - Axios

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/letmegrab.git
cd letmegrab
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
letmegrab/
├── src/
│   ├── components/     # Reusable components
│   ├── context/        # React context providers
│   ├── pages/          # Page components
│   ├── assets/         # Static assets
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
├── public/             # Public assets
└── package.json        # Project dependencies
```

## Key Components

- **Authentication**
  - Login/Signup forms
  - Protected routes
  - User session management

- **Products**
  - Product listing with images
  - Search and filter functionality
  - Loading states and skeletons
  - Responsive grid layout

- **Navigation**
  - Responsive navbar
  - Conditional rendering based on auth state
  - Smooth page transitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- Material-UI for the component library
- Fake Store API for product data
- React and Vite teams for the amazing tools
