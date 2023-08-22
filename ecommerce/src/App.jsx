import { useState, useEffect, useCallback } from 'react';
import { useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import("preline");
import "./App.css";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import LandingPage from "./components/Everything/LandingPage";
import Product_Page from "./components/Product_page/Product_Page";
import Cart from "./components/cart/Cart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login';
import Dashboard from './components/Dashboard';
import Categories from './Components/Categories';
import Products from './Components/Products';
import Messages from './components/Messages';
import Customers from './components/Customers';
import Settings from './Components/Settings';
import Profile from './components/Profile';
import CheckoutPage from "./components/cart/CheckoutPage";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";


axios.defaults.baseURL = 'https://localhost:7033/';

function useAuthCheck() {
  const isAuthenticated = !!localStorage.getItem('token');
  const tokenExpiration = localStorage.getItem('tokenExpiration');

  const navigate = useNavigate(); // Get navigate from the Router context

  useEffect(() => {
    const isTokenExpired = () => {
      const now = new Date().getTime();
      return tokenExpiration && now > parseInt(tokenExpiration);
    };

    if (!isAuthenticated || isTokenExpired()) {
      clearAuth();
      navigate('/login'); // Use navigate to redirect
    }
  }, [isAuthenticated, navigate, tokenExpiration]);

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('user');
  };

  return isAuthenticated;
}

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useAuthCheck();
  return isAuthenticated ? element : null;
};

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loginError, setLoginError] = useState('');



  const handleLogin = useCallback(async (Email, Password, RememberMe) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = {
        Email,
        Password,
        RememberMe,
      };

      const response = await axios.post('/api/Auth/Login', JSON.stringify(data), config);
      const { user, token } = response.data;

      if (token) {
        const expirationTime = new Date().getTime() + 3600000;
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', expirationTime.toString());
        localStorage.setItem('user', JSON.stringify(user));

        setLoginError('');
        navigate('/landing'); // Use navigate to redirect
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        setLoginError(errorMessage);
      } else {
        setLoginError('An error occurred while processing your request.');
      }
    }
  }, [navigate]);

  useEffect(() => {
    setLoginError('');
  }, []);
  return (

    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} loginError={loginError} token={token} />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/landing/checkout" element={<CheckoutPage />} />
        <Route path="/landing/product/:id" element={<Product_Page />} />
        <Route path="/landing/category/:category" element={<LandingPage />} />
        <Route path="/landing/cart" element={<Cart />} />

        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} navigateTo={navigate} />} />
        <Route path="/categories" element={<PrivateRoute element={<Categories />} navigateTo={navigate} />} />
        <Route path="/products" element={<PrivateRoute element={<Products />} navigateTo={navigate} />} />
        <Route path="/messages" element={<PrivateRoute element={<Messages />} navigateTo={navigate} />} />
        <Route path="/customers" element={<PrivateRoute element={<Customers />} navigateTo={navigate} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} navigateTo={navigate} />} />
        <Route path="/settings" element={<PrivateRoute element={<Settings />} navigateTo={navigate} />} />
      </Routes>
    </>
  );
}

export default App;
