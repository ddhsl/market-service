import styled from "styled-components";
import { useState } from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../utils/cookieUtils";
import ConfirmModal from "./ConfirmModal";

export default function ActiveItem({ product, onDelete }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/register/${product.id}`, { state: { product } });
  };

  const handleDeleteClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmModalOpen(false);
    try {
      const accessToken = getCookie("accessToken");
      const response = await fetch(
        `https://estapi.openmarket.weniv.co.kr/products/${product.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "상품 삭제에 실패했습니다.");
      }

      alert("상품이 성공적으로 삭제되었습니다.");

      if (onDelete) {
        onDelete(product.id);
      }
    } catch (error) {
      console.error("상품 삭제 오류:", error);
      alert(error.message);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <ActiveItemWrap>
        <ul>
          <li
            style={{
              flex: 5,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <img
              src={product.image}
              alt="상품 이미지"
              key={product.id}
              onClick={() => navigate(`/product-details/${product.id}`)}
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p
                style={{ cursor: "pointer" }}
                key={product.id}
                onClick={() => navigate(`/product-details/${product.id}`)}
              >
                {product.name}
              </p>
              <p style={{ fontSize: "16px", color: "var(--sub-color)" }}>
                재고 : {product.stock}개
              </p>
            </div>
          </li>
          <li style={{ flex: 2.4, textAlign: "center", fontWeight: "700" }}>
            {product.price.toLocaleString()}원
          </li>
          <li style={{ flex: 1.3, textAlign: "center" }}>
            <Button type="button" onClick={handleEditClick}>
              수정
            </Button>
          </li>
          <li style={{ flex: 1.3, textAlign: "center" }}>
            <Button
              type="button"
              onClick={handleDeleteClick}
              style={{
                backgroundColor: "#fff",
                color: "var(--sub-color)",
                border: "1px solid #c4c4c4",
              }}
            >
              삭제
            </Button>
          </li>
        </ul>
      </ActiveItemWrap>
      {isConfirmModalOpen && (
        <ConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
}

const ActiveItemWrap = styled.article`
  background-color: #fff;
  border-bottom: 1px solid #c4c4c4;
  padding: 16px 30px;

  & > ul {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 18px;
  }

  & > ul > li {
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
      width: 70px;
      height: 70px;
      border-radius: 100px;
      cursor: pointer;
    }

    & > button {
      width: 80px;
      height: 40px;
      font-size: 16px;
    }
  }
`;
