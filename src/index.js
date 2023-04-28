import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider,Route } from 'react-router-dom';
import App from './App';
import FuelQuoteForm from './pages/FuelQuoteForm';
import FuelQuoteHistory from './pages/FuelQuoteHistory';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>,
  },
  {
    path: "login",
    element: <LoginPage/>,
  },
  {
    path: "Form",
    element: <FuelQuoteForm/>,
  },
  {
    path: "History",
    element: <FuelQuoteHistory/>,
  },
  {
    path: "Profile",
    element: <Profile/>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);
