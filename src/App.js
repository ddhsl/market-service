import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Home from "./pages/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Join from "./pages/join/Join.jsx";
import ProductDetails from "./pages/productDetails/ProductDetails.jsx";
import Cart from "./pages/cartPage/Cart.jsx";
import Payment from "./pages/paymentPage/Payment.jsx";
import SellerCenter from "./pages/sellerCenter/SellerCenter.jsx";
import RegisterProduct from "./pages/registerProduct/RegisterProduct.jsx";
import ErrorPage from "./pages/error/ErrorPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/seller-center" element={<SellerCenter />} />
        <Route path="/register" element={<RegisterProduct />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
