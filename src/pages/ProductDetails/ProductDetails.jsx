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
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../../components/LoginModal";
import CartModal from "./component/CartModal";
import { getCookie } from "../../utils/cookieUtils";

export default function ProductDetails() {
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
      setPurchaseQuantity(purchaseQuantity - 1);
    }
  };

  const handleIncrease = () => {
    if (purchaseQuantity < product.stock) {
      setPurchaseQuantity(purchaseQuantity + 1);
    }
  };
  async function handleCart() {
    if (isLoggedIn && !isSeller) {
      try {
        // 쿠키에서 accessToken 가져오기
        const accessToken = getCookie("accessToken");

        // accessToken이 없으면 로그인 모달을 열고 종료
        if (!accessToken) {
          setIsLoginModalOpen(true);
          return;
        }

        const response = await fetch(
          "https://estapi.openmarket.weniv.co.kr/cart/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
            },
            body: JSON.stringify({
              product_id: product.id,
              quantity: purchaseQuantity,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log(data.detail);
          setIsCartModalOpen(true); // 카트 모달이 성공적인 응답에서만 열림
        } else {
          console.log("장바구니에 상품 담기가 실패했습니다.");
        }
      } catch (error) {
        console.error(error, "서버 오류가 발생했습니다.");
      }
    } else {
      setIsLoginModalOpen(true);
    }
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://estapi.openmarket.weniv.co.kr/products/${id}/`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("상품 상세 정보를 불러오는 데 실패했습니다.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!product) {
    return <div>상품 정보가 없습니다.</div>;
  }

  const isSellerUser = isLoggedIn && isSeller;
  const isAvailable = product.stock > 0 || isSellerUser;

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
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <Header />
      <ProductInfoSection>
        <h2 className="sr-only">상품정보</h2>
        <ProductImg variant="detail" src={product.image} alt={product.name} />
        <ProductDetail>
          <StoreName variant="detail">{product.seller.store_name}</StoreName>
          <ProductName variant="detail">{product.name}</ProductName>
          <Price variant="detail">
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
                variant="detail"
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

          <Button
            style={{
              width: "416px",
              height: "60px",
              backgroundColor:
                isSellerUser || !isAvailable ? "#c4c4c4" : "var(--main-color)",
              cursor: isSellerUser || !isAvailable ? "not-allowed" : "pointer",
            }}
            onClick={handleDirectPurchase}
            disabled={isSellerUser || !isAvailable}
          >
            바로 구매
          </Button>
          <Button
            width="200px"
            height="60px"
            backgroundColor={
              isSellerUser || !isAvailable ? "#c4c4c4" : "var(--sub-color)"
            }
            marginLeft="14px"
            onClick={handleCart}
            disabled={isSellerUser || !isAvailable}
          >
            장바구니
          </Button>
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
  width: 630px;
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
