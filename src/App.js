import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import MyOrderPage from "./pages/myPage/MyOrderPage.jsx";
import SearchResults from "./pages/search/SearchResults.jsx";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";
import Loader from "./components/Loader.jsx";

function App() {
  const { isLoggedIn, isSeller, refreshAccessToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (isLoggedIn) {
        const newAccessToken = await refreshAccessToken();
        if (!newAccessToken) {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [isLoggedIn, refreshAccessToken]);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />

        {/* 구매회원만 접근 가능한 페이지 */}
        <Route
          path="/cart"
          element={
            isLoggedIn && !isSeller ? <Cart /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/payment"
          element={
            isLoggedIn && !isSeller ? <Payment /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/mypage"
          element={
            isLoggedIn && !isSeller ? <MyOrderPage /> : <Navigate to="/login" />
          }
        />

        {/* 판매회원만 접근 가능한 페이지 */}
        <Route
          path="/seller-center"
          element={
            isLoggedIn && isSeller ? <SellerCenter /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn && isSeller ? (
              <RegisterProduct isEditMode={false} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/register/:id"
          element={
            isLoggedIn && isSeller ? (
              <RegisterProduct />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/search" element={<SearchResults />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
