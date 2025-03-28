import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import Button from "../../components/Button";
import PurchaseInfoSection from "./component/PurchaseInfoSection";
import QuantityControl from "./component/QuantityControl";
import {
  ProductImg,
  StoreName,
  ProductName,
  Price,
} from "../../styles/mainStyle";
import LoginModal from "../../components/LoginModal";
import CartModal from "./component/CartModal";
import { getCookie } from "../../utils/cookieUtils";
import { API_BASE_URL } from "../../constants/api";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/AuthContext";

export default function ProductDetails() {
  const { refreshAccessToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { isLoggedIn, isSeller } = useAuth();

  const handleDecrease = () => {
    if (purchaseQuantity > 1) {
      setPurchaseQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    if (purchaseQuantity < product.stock) {
      setPurchaseQuantity((prev) => prev + 1);
    }
  };

  async function handleCart() {
    if (isLoggedIn && !isSeller) {
      try {
        let accessToken = getCookie("accessToken");

        if (!accessToken) {
          setIsLoginModalOpen(true);
          return;
        }

        const addToCart = async (token) => {
          const response = await fetch(`${API_BASE_URL}/cart/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              product_id: product.id,
              quantity: purchaseQuantity,
            }),
          });

          if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
          }

          return response.json();
        };

        try {
          const data = await addToCart(accessToken);
          console.log(data.detail);
          setIsCartModalOpen(true);
        } catch (error) {
          // If the first attempt fails, try refreshing the token
          const newAccessToken = await refreshAccessToken();

          if (!newAccessToken) {
            throw new Error("Failed to refresh access token");
          }

          const data = await addToCart(newAccessToken);
          console.log(data.detail);
          setIsCartModalOpen(true);
        }
      } catch (error) {
        console.error(error, "서버 오류가 발생했습니다.");
        alert(
          "장바구니에 상품을 담는 데 문제가 발생했습니다. 다시 시도해주세요."
        );
      }
    } else if (!isSellerUser) {
      setIsLoginModalOpen(true);
    }
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${id}/`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        alert("상품 상세 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <div>상품 정보가 없습니다.</div>;
  }

  const isSellerUser = isLoggedIn && isSeller;
  const isAvailable = product.stock > 0 || isSellerUser;
  const isButtonDisabled = isSellerUser || !isAvailable;

  const handleDirectPurchase = () => {
    if (isLoggedIn && !isSeller) {
      const selectedItem = {
        product: {
          id: product.id,
          image: product.image,
          name: product.name,
          price: product.price,
          shipping_method: product.shipping_method,
          shipping_fee: product.shipping_fee,
          seller: {
            store_name: product.seller.store_name,
          },
        },
        quantity: purchaseQuantity,
      };
      navigate("/payment", { state: { selectedItems: [selectedItem] } });
    } else if (!isSellerUser) {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <Header />
      <ProductInfoSection>
        <h2 className="sr-only">상품정보</h2>
        <ProductImg $variant="detail" src={product.image} alt={product.name} />
        <ProductDetail>
          <StoreName $variant="detail">{product.seller.store_name}</StoreName>
          <ProductName $variant="detail">{product.name}</ProductName>
          <Price $variant="detail">
            {product.price.toLocaleString()} <span>원</span>{" "}
          </Price>

          <p style={{ color: "var(--sub-color", marginTop: "138px" }}>
            택배배송 / 무료배송
          </p>
          <QuantitySection>
            <QuantityControl
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
              quantity={purchaseQuantity}
              isAvailable={isAvailable && !isSellerUser}
              stock={product.stock}
            />
          </QuantitySection>
          <OrderSummary>
            <p>총 상품 금액</p>
            <div>
              <p>
                총 수량{" "}
                <span style={{ color: "var(--main-color)" }}>
                  {purchaseQuantity}
                </span>
                개
              </p>
              <Price
                $variant="detail"
                style={{
                  color: "var(--main-color)",
                }}
              >
                {(product.price * purchaseQuantity).toLocaleString()}
                <span style={{ color: "var(--main-color)", marginLeft: "4px" }}>
                  원
                </span>
              </Price>
            </div>
          </OrderSummary>

          <ButtonWrap>
            <Button
              $width="416px"
              $height="60px"
              $backgroundColor={isButtonDisabled ? "#c4c4c4" : ""}
              cursor={isButtonDisabled ? "not-allowed" : "pointer"}
              onClick={handleDirectPurchase}
              $disabled={isButtonDisabled}
            >
              바로 구매
            </Button>

            <Button
              $width="200px"
              $height="60px"
              $backgroundColor={isButtonDisabled ? "#c4c4c4" : "#8b8b8b"}
              $buttonType="cart"
              $marginLeft="14px"
              onClick={handleCart}
              $disabled={isButtonDisabled}
            >
              장바구니
            </Button>
          </ButtonWrap>

          {!isAvailable && (
            <p style={{ color: "red", marginTop: "13px" }}>
              *현재 재고가 없습니다.
            </p>
          )}
        </ProductDetail>
      </ProductInfoSection>
      <PurchaseInfoSection />
      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
      {isCartModalOpen && (
        <CartModal onClose={() => setIsCartModalOpen(false)} />
      )}
    </>
  );
}

const ProductInfoSection = styled.section`
  padding: 0 6%;
  display: flex;
  gap: 50px;
  margin-top: 80px;
  & > img {
    width: 600px;
    height: 600px;
  }
`;
const ProductDetail = styled.div`
  & > button {
    font-size: 18px;
    font-weight: bold;
    margin-top: 22px;
  }
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 110px;
  border: 1px solid #c4c4c4;
  border-left: none;
  border-right: none;
  margin-top: 20px;
  margin-bottom: 32px;
`;

const OrderSummary = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 50px;

  & > p {
    font-weight: bold;
    font-size: 18px;
  }

  & > div {
    display: flex;
    align-items: baseline;
  }

  & > div > p:nth-child(1) {
    font-size: 18px;
    color: var(--sub-color);
  }

  & > div > p:nth-child(1)::after {
    content: "|";
    margin-left: 11px;
    margin-right: 11px;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  margin-top: 40px;
`;
