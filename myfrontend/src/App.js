import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { createContext, useState } from "react";
import { useSelector } from 'react-redux';
import NewProduct from './pages/NewProduct';
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage";
import ReactSwitch from "react-switch";
import OrdersPage from "./pages/OrdersPage";
import AdminDashboard from "./pages/AdminDashboard";



export const ThemeContext = createContext(null);



function App() {
  const user = useSelector((state) => state.user);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <BrowserRouter>
          <ScrollToTop />
          <Navigation />
          <Routes>
            <Route index element={<Home />} />
            {!user && (
              <>
                /*<Route path="/login" element={<Login />} />*/
                <Route path="/signup" element={<Signup />} />
              </>
            )}
            {user && (
                          <>
                              <Route path="/cart" element={<CartPage />} />
                              <Route path="/orders" element={<OrdersPage />} />
                          </>
                      )}
            
            {user && user.isAdmin && (
                        <>
                            <Route path="/admin" element={<AdminDashboard />} />
                    
                        </>
                    )}

            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
           
            
            <Route path="/new-product" element={<NewProduct />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>

                  <footer className="fixed-footer">
            <div className="switch">
              <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
              <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
            </div>
          </footer>
      </div>  
    </ThemeContext.Provider>
  );
}

export default App;