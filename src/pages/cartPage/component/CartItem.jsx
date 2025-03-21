import styled from "styled-components";
import closeIcon from "../../../assets/icon-delete.svg";
import QuantityControl from "../../productDetails/component/QuantityControl";
import Button from "../../../components/Button";
import circleCheck from "../../../assets/circle-check-box-.png";
import circleCheckOn from "../../../assets/circle-check-box-Fill.png";

export default function CartItem({
  item,
  onQuantityChange,
  openDeleteModal,
  isChecked,
  onCheck,
  handleEachOrderClick,
}) {
  const { id, product, quantity } = item;

  const handleCartIncrease = () => {
    const newQuantity = quantity + 1;
    onQuantityChange(id, newQuantity);
  };

  const handleCartDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      onQuantityChange(id, newQuantity);
    }
  };

  const handleCheckClick = () => {
    onCheck(id);
  };

  return (
    <CartItemField key={id}>
      <img src={closeIcon} alt="닫기" onClick={() => openDeleteModal(item)} />
      <CartItemWrap>
        <img
          src={isChecked ? circleCheckOn : circleCheck}
          alt="체크 아이콘"
          onClick={handleCheckClick}
          style={{ cursor: "pointer" }}
        />
        <CartItemContent
          flex={4.5}
          style={{ justifyContent: "flex-start", gap: "36px" }}
        >
          <img src={product.image} alt="상품사진" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "13px",
              justifyContent: "center",
            }}
          >
            <p>{product.seller?.store_name}</p>
            <p>{product.name}</p>
            <p>{product.price.toLocaleString()}원</p>
            <p>무료배송 / 택배배송</p>
          </div>
        </CartItemContent>
        <CartItemContent flex={3}>
          <QuantityControl
            quantity={quantity}
            handleDecrease={handleCartDecrease}
            handleIncrease={handleCartIncrease}
          />
        </CartItemContent>
        <CartItemContent flex={2.5}>
          <PriceAndOrder>
            <span>{(product.price * quantity).toLocaleString()}원</span>
            <Button onClick={() => handleEachOrderClick(item)}>주문하기</Button>
          </PriceAndOrder>
        </CartItemContent>
      </CartItemWrap>
    </CartItemField>
  );
}

const CartItemField = styled.article`
  width: 100%;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 0;
  margin-bottom: 10px;
  & > img {
    position: absolute;
    right: 105px;
    cursor: pointer;
  }
`;

const CartItemWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 0;
  & > img {
    margin-left: 30px;
    margin-right: 40px;
  }
`;

const CartItemContent = styled.div`
  flex: ${({ flex }) => flex};
  display: flex;
  justify-content: center;
  & > img {
    width: 160px;
    height: 160px;
    border-radius: 10px;
    object-fit: cover;
  }
  & > div > p:nth-child(1) {
    color: var(--sub-color);
    font-size: 14px;
  }
  & > div > p:nth-child(2) {
    font-size: 18px;
  }
  & > div > p:nth-child(3) {
    font-weight: bold;
    margin-bottom: 30px;
  }
  & > div > p:nth-child(4) {
    color: var(--sub-color);
    font-size: 14px;
  }
`;

const PriceAndOrder = styled.div`
  display: flex;
  flex-direction: column;
  width: 130px;
  align-items: center;
  gap: 25px;
  color: #eb5757;
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  & > button {
    width: 130px;
    height: 40px;
  }
`;
