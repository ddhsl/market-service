import styled from "styled-components";
import { useState } from "react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../utils/cookieUtils";
import ConfirmModal from "./ConfirmModal";
import { API_BASE_URL } from "../../../constants/api";
import { useAuth } from "../../../context/AuthContext";

export default function ActiveItem({ product, onDelete }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const navigate = useNavigate();
  const { refreshAccessToken } = useAuth();

  const handleEditClick = () => {
    navigate(`/register/${product.id}`, { state: { product } });
  };

  const handleDeleteClick = () => {
    setIsConfirmModalOpen(true);
  };

  // 토큰 확인 및 갱신 함수
  const getValidToken = async () => {
    let accessToken = getCookie("accessToken");
    if (!accessToken) {
      accessToken = await refreshAccessToken();
    }
    return accessToken;
  };

  // 상품 삭제 API 요청 함수
  const deleteProductRequest = async (accessToken) => {
    const response = await fetch(`${API_BASE_URL}/products/${product.id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "상품 삭제에 실패했습니다.");
    }

    return response;
  };

  const handleConfirmDelete = async () => {
    setIsConfirmModalOpen(false);

    try {
      // 유효한 토큰 얻기
      let accessToken = await getValidToken();

      if (!accessToken) {
        throw new Error("토큰 갱신에 실패했습니다.");
      }

      try {
        // 첫 번째 삭제 시도
        await deleteProductRequest(accessToken);

        // 삭제 성공 시 콜백 호출
        if (onDelete) {
          onDelete(product.id);
        }
      } catch (error) {
        // 401 에러 시 토큰 재갱신 시도
        if (error.message.includes("401")) {
          accessToken = await refreshAccessToken();

          if (!accessToken) {
            throw new Error("리프레시 토큰으로 갱신 실패");
          }

          // 재갱신된 토큰으로 다시 삭제 시도
          await deleteProductRequest(accessToken);

          if (onDelete) {
            onDelete(product.id);
          }
        } else {
          // 다른 에러는 그대로 throw
          throw error;
        }
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
              onClick={() => navigate(`/product-details/${product.id}`)}
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p
                style={{ cursor: "pointer" }}
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
              $backgroundColor="#fff"
              $color="var(--sub-color)"
              $border="1px solid #c4c4c4"
              $buttonType="cancel"
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
