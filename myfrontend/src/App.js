import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import NewProduct from './pages/NewProduct';
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage";
import ThemeContext from './features/theme';




function App() {
  const user = useSelector((state) => state.user);
  const { dark } = useContext(ThemeContext);
  
  return (
    <div className={`App-${dark ? 'dark' : 'light'}`}>
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          {user && (
                        <>
                            <Route path="/cart" element={<CartPage />} />
                            
                        </>
                    )}

          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          
          <Route path="/new-product" element={<NewProduct />} />

          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;