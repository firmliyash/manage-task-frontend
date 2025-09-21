# Task Manager Frontend

A React-based task management application built with modern technologies and best practices.

## Features

- 🔐 **Authentication System**: Login and Signup with JWT tokens
- 🛡️ **Protected Routes**: Route-based access control
- 🎨 **Modern UI**: Built with Mantine UI components
- 📱 **Responsive Design**: Works on all screen sizes
- 🔄 **State Management**: Redux Toolkit for global state
- 🌐 **API Integration**: Axios with interceptors for API calls
- ⚡ **Data Fetching**: React Query for server state management
- 🔧 **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Mantine UI
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack React Query (React Query)
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Styling**: CSS-in-JS with Emotion (Mantine's styling solution)

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running on `http://localhost:8001`

## Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   - The `.env` file is configured with:
     ```
     VITE_API_BASE_URL=http://localhost:8001/api
     ```
   - Ensure your backend API is running on port 8001

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open http://localhost:5173 in your browser

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ProtectedRoute.tsx
├── hooks/              # Custom React hooks
│   ├── redux.ts        # Typed Redux hooks
│   └── useAuth.ts      # Authentication hooks
├── pages/              # Page components
│   ├── Dashboard.tsx   # Protected dashboard
│   ├── Login.tsx       # Login page
│   └── Signup.tsx      # Signup page
├── services/           # API and external services
│   └── api.ts          # Axios configuration with interceptors
├── store/              # Redux store configuration
│   ├── authSlice.ts    # Authentication slice
│   └── index.ts        # Store setup
├── types/              # TypeScript type definitions
│   └── auth.ts         # Authentication types
├── utils/              # Utility functions
├── App.tsx             # Main app component
└── main.tsx            # Application entry point
```

## API Integration

The application integrates with your backend API running on port 8001. The expected API endpoints are:

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration  
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Token refresh
- `GET /auth/me` - Get current user

### Expected Login Response Format

```json
{
  "status": "OK",
  "message": "Success",
  "data": {
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token", 
    "userInfo": {
      "id": 1,
      "email": "user@example.com",
      "role": "user",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
