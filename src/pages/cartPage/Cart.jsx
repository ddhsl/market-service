import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import Button from "../../components/Button";
import CartItem from "./component/CartItem";
import PaymentOverview from "./component/PaymentOverview";
import { getCookie } from "../../utils/cookieUtils";
import EmptyCartMessage from "./component/EmptyCartMessage";
import DeleteModal from "./component/DeleteModal";

const cartLabels = [
  { text: "상품정보", flex: 5 },
  { text: "수량", flex: 2.5 },
  { text: "상품금액", flex: 2.5 },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedCartItems, setSelectedCartItems] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);
      try {
        const accessToken = getCookie("accessToken");
        const response = await fetch(
          "https://estapi.openmarket.weniv.co.kr/cart/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }

        const data = await response.json();
        setCartItems(data.results);
      } catch (error) {
        console.error("장바구니 아이템을 가져오는 데 실패했습니다.", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // 아이템 선택/해제 핸들러
  const handleItemSelection = (itemId) => {
    setSelectedCartItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(itemId)) {
        newSelected.delete(itemId);
      } else {
        newSelected.add(itemId);
      }
      return newSelected;
    });
  };

  // 결제 페이지로 이동하는 함수
  const navigateToPaymentPage = (items) => {
    if (items.length > 0) {
      navigate("/payment", { state: { selectedItems: items } });
    } else {
      alert("주문할 아이템을 선택해주세요.");
    }
  };

  // 주문하기 버튼 클릭 시 선택된 아이템으로 결제 페이지로 이동
  const handleOrderClick = () => {
    const selectedItems = cartItems.filter((item) =>
      selectedCartItems.has(item.id)
    );
    navigateToPaymentPage(selectedItems);
  };

  // 개별 아이템 주문하기 버튼 클릭 시 해당 아이템으로 결제 페이지로 이동
  const handleEachOrderClick = (item) => {
    navigateToPaymentPage([item]);
  };

  // 장바구니 수량 수정
  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      const accessToken = getCookie("accessToken");
      const response = await fetch(
        `https://estapi.openmarket.weniv.co.kr/cart/${itemId}/`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      if (!response.ok) {
        throw new Error(`수량 업데이트 실패: ${response.status}`);
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("수량 업데이트 중 오류 발생:", error);
    }
  };

  if (isLoading) {
    return <LoadingMessage>로딩 중...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>오류 발생: {error}</ErrorMessage>;
  }

  const hasCartItems = cartItems.length > 0;

  const handleDelete = async (itemId) => {
    try {
      const accessToken = getCookie("accessToken");
      const response = await fetch(
        `https://estapi.openmarket.weniv.co.kr/cart/${itemId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`삭제 실패: ${response.status}`);
      }

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("서버 오류가 발생했습니다:", error);
    }
  };

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setIsOpenDeleteModal(true);
  };

  // 총 상품 금액 계산
  const totalProductPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const productDiscount = 0;
  const shippingFee = 0;
  const paymentAmount = totalProductPrice - productDiscount + shippingFee;

  return (
    <>
      <Header />
      <CartMain>
        <CartTitle>장바구니</CartTitle>
        <CartField>
          {cartLabels.map(({ text, flex }) => (
            <CartLabel key={text} $flex={flex}>
              {text}
            </CartLabel>
          ))}
        </CartField>
        {hasCartItems ? (
          <>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                openDeleteModal={openDeleteModal}
                isChecked={selectedCartItems.has(item.id)}
                onCheck={handleItemSelection}
                handleEachOrderClick={() => handleEachOrderClick(item)}
              />
            ))}
            <PaymentOverview
              totalProductPrice={totalProductPrice}
              productDiscount={productDiscount}
              shippingFee={shippingFee}
              paymentAmount={paymentAmount}
            />
            <Button onClick={handleOrderClick}>주문하기</Button>
          </>
        ) : (
          <EmptyCartMessage />
        )}
      </CartMain>
      {isOpenDeleteModal && (
        <DeleteModal
          handleDelete={handleDelete}
          onClose={() => setIsOpenDeleteModal(false)}
          item={itemToDelete}
        />
      )}
    </>
  );
}

const CartMain = styled.main`
  padding: 0 6%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > button {
    width: 220px;
    height: 68px;
    font-size: 24px;
    margin: 40px auto 160px;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;

export const CartField = styled.div`
  width: 100%;
  height: 60px;
  background-color: #f2f2f2;
  border-radius: 10px;
  margin-bottom: 35px;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

export const CartTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin: 54px auto;
  margin-bottom: 52px;
`;

export const CartLabel = styled.p`
  flex: ${({ $flex }) => $flex};
  text-align: center;
`;

const LoadingMessage = styled.div`
  width: 100%;
  padding: 40px 0;
  text-align: center;
  font-size: 16px;
  color: #767676;
`;

const ErrorMessage = styled.div`
  width: 100%;
  padding: 40px 0;
  text-align: center;
  font-size: 16px;
  color: #eb5757;
`;
