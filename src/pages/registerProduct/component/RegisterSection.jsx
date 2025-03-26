import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import ImageUpload from "./ImageUpload";
import { useNavigate, useLocation } from "react-router-dom";
import { getCookie } from "../../../utils/cookieUtils";
import { API_BASE_URL } from "../../../constants/api";
export default function RegisterSection({ isEditMode, productId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    name: "",
    info: "",
    price: "",
    shipping_method: "PARCEL",
    shipping_fee: "",
    stock: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        info: product.info,
        price: product.price.toLocaleString(),
        shipping_method: product.shipping_method,
        shipping_fee: product.shipping_fee,
        stock: product.stock,
      });
      setImage(product.image);
    }
  }, [product]);

  useEffect(() => {
    if (isEditMode && productId) {
      const fetchProductData = async () => {
        try {
          const response = await fetch(
            `${API_BASE_URL}/products/${productId}/`
          );
          if (!response.ok) {
            throw new Error("상품 정보를 불러오는 데 실패했습니다.");
          }
          const data = await response.json();
          setFormData({
            name: data.name,
            info: data.info,
            price: data.price.toLocaleString(),
            shipping_method: data.shipping_method,
            shipping_fee: data.shipping_fee,
            stock: data.stock,
          });
          setImage(data.image);
        } catch (error) {
          console.error(error);
          alert(error.message);
        }
      };
      fetchProductData();
    }
  }, [isEditMode, productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShippingMethodChange = (method) => {
    setFormData((prevData) => ({
      ...prevData,
      shipping_method: method,
    }));
  };

  const handleImageChange = (file) => {
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("상품명을 입력해주세요.");
      return;
    }

    if (!formData.price.trim()) {
      alert("판매가를 입력해주세요.");
      return;
    }

    const priceValue = formData.price.replace(/[^\d]/g, "");
    const priceInt = parseInt(priceValue, 10);

    if (isNaN(priceInt)) {
      alert("판매가는 유효한 정수여야 합니다.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("info", formData.info);
    data.append("price", priceInt);
    data.append("shipping_method", formData.shipping_method);
    data.append("shipping_fee", formData.shipping_fee);
    data.append("stock", formData.stock);

    if (image instanceof File) {
      data.append("image", image);
    } else if (image && typeof image === "string") {
      data.append("image_url", image);
    } else {
      alert("상품 이미지를 선택해주세요.");
      return;
    }

    try {
      const accessToken = getCookie("accessToken");
      const response = await fetch(
        isEditMode
          ? `${API_BASE_URL}/products/${productId}/`
          : `${API_BASE_URL}/products/`,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: data,
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("서버 응답 오류:", errorData);
        alert(`상품 ${isEditMode ? "수정" : "등록"} 실패: ${errorData}`);
        return;
      }

      const result = await response.json();
      alert(`상품이 성공적으로 ${isEditMode ? "수정" : "등록"}되었습니다.`);
      navigate(`/product-details/${result.id}`);
    } catch (error) {
      console.error("오류 발생:", error);
      alert(`오류 발생: ${error.message}`);
    }
  };

  return (
    <RegisterSectionWrap>
      <h3 className="sr-only">상품 {isEditMode ? "수정" : "등록"}하기</h3>
      <form
        onSubmit={(e) => {
          console.log("Form submit 이벤트 발생");
          handleSubmit(e);
        }}
      >
        <div className="register-container">
          <ImageUpload onImageChange={handleImageChange} />

          <div className="input-container">
            <div>
              <label htmlFor="name">상품명</label>
              <ProductNameInput
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <InputWithUnit
              label="판매가"
              unit="원"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
            />
            <div>
              <label>배송방법</label>
              <ButtonGroup>
                <ShippingButton
                  type="button"
                  isSelected={formData.shipping_method === "PARCEL"}
                  onClick={() => handleShippingMethodChange("PARCEL")}
                >
                  택배, 소포, 등기
                </ShippingButton>
                <ShippingButton
                  type="button"
                  isSelected={formData.shipping_method === "DELIVERY"}
                  onClick={() => handleShippingMethodChange("DELIVERY")}
                >
                  직접배송(화물배달)
                </ShippingButton>
              </ButtonGroup>
            </div>
            <InputWithUnit
              label="기본 배송비"
              unit="원"
              name="shipping_fee"
              id="shipping_fee"
              value={formData.shipping_fee}
              onChange={handleChange}
            />
            <InputWithUnit
              label="재고"
              unit="개"
              name="stock"
              id="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="info"
            style={{ color: "var(--sub-color)", marginBottom: "10px" }}
          >
            상품 정보
          </label>
          <textarea
            name="info"
            id="info"
            value={formData.info}
            onChange={handleChange}
            style={{
              width: "100%",
              height: "400px",
              maxHeight: "700px",
              border: "1px solid #c4c4c4",
              borderRadius: "10px",
              padding: "20px",
            }}
          />
        </div>
        <ButtonWrap>
          <Button type="button" onClick={() => alert("취소 버튼 클릭됨")}>
            취소
          </Button>
          <Button type="submit">{isEditMode ? "수정하기" : "등록하기"}</Button>
        </ButtonWrap>
      </form>
    </RegisterSectionWrap>
  );
}

const RegisterSectionWrap = styled.section`
  width: 100%;

  .register-container {
    display: flex;
    gap: 40px;
    margin-bottom: 40px;
  }

  .input-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  label {
    display: block;
    margin-bottom: 10px;
    color: var(--sub-color);
  }
`;

const ProductNameInput = styled.input`
  width: 100%;
  height: 54px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 16px;
`;

function InputWithUnit({ label, unit, name, id, value, onChange }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <InputWrapper>
        <StyledRegisterInput
          type="text"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
        />
        <UnitBox>{unit}</UnitBox>
      </InputWrapper>
    </div>
  );
}

const StyledRegisterInput = styled.input`
  width: 166px;
  height: 54px;
  padding: 16px;
  border: 1px solid #c4c4c4;
  border-right: none;
  border-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UnitBox = styled.div`
  width: 54px;
  height: 54px;
  background-color: #c4c4c4;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  text-align: center;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 50px;
  margin-bottom: 130px;
  & > button {
    width: 150px;
    height: 50px;
    font-size: 18px;
  }

  & > button:nth-child(1) {
    color: var(--sub-color);
    background-color: #fff;
    border: 1px solid #c4c4c4;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const ShippingButton = styled.button`
  width: 220px;
  height: 54px;
  font-weight: bold;
  text-align: center;
  background-color: ${({ isSelected }) =>
    isSelected ? "var(--main-color)" : "#fff"};
  color: ${({ isSelected }) => (isSelected ? "#fff" : "var(--sub-color)")};
  border: 1px solid
    ${({ isSelected }) => (isSelected ? "var(--main-color)" : "#c4c4c4")};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "var(--main-color)" : "#f0f0f0"};
  }
`;
