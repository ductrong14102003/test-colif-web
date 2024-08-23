import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import women_banner from "./Components/Assets/banner 3.png";
import men_banner from "./Components/Assets/sofaa2banner.png";
import kid_banner from "./Components/Assets/banner 1.png";
import LoginSignup from "./Pages/LoginSignup";
import HomePage from "./Pages/HomePage/HomePage";
import CartPage from "./Pages/CartPage/CartPage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";

export const backend_url = "http://localhost:4000";
export const currency = "$";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage gender="all" />} />

          <Route
            path="/sofa-bed"
            element={<ShopCategory banner={men_banner} category="sofa-bed" />}
          />
          <Route
            path="/den"
            element={<ShopCategory banner={women_banner} category="den" />}
          />
          <Route
            path="/ghe-luoi"
            element={<ShopCategory banner={kid_banner} category="ghe-luoi" />}
          />
          <Route
            path="/ban-da-nang"
            element={
              <ShopCategory banner={kid_banner} category="ban-da-nang" />
            }
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
