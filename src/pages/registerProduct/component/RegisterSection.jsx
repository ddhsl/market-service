import { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import iconImg from "../../../assets/icon-img.png";

export default function RegisterSection() {
  return (
    <RegisterSectionWrap>
      <h3 className="sr-only">상품 등록하기</h3>
      <div className="register-container">
        <ImageUpload />
        <div className="input-container">
          <div>
            <label htmlFor="productName">상품명</label>
            <ProductNameInput type="text" name="productName" id="productName" />
          </div>
          <InputWithUnit label="판매가" unit="원" name="price" id="price" />
          <div>
            <label>배송방법</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button style={{ width: "220px", height: "54px" }}>
                택배, 소포, 등기
              </Button>
              <Button
                style={{
                  width: "220px",
                  height: "54px",
                  color: "var(--sub-color)",
                  backgroundColor: "#fff",
                  border: "1px solid #c4c4c4",
                }}
              >
                직접배송(화물배달)
              </Button>
            </div>
          </div>
          <InputWithUnit
            label="기본 배송비"
            unit="원"
            name="shippingFee"
            id="shippingFee"
          />
          <InputWithUnit label="재고" unit="개" name="stock" id="stock" />
        </div>
      </div>
      <div>
        <p style={{ color: "var(--sub-color)", marginBottom: "10px" }}>
          상품 상세 정보
        </p>
        <div
          style={{
            width: "100%",
            height: "700px",
            backgroundColor: "#f2f2f2",
          }}
        >
          에디터 영역
        </div>
      </div>
      <ButtonWrap>
        <Button>취소</Button>
        <Button>저장하기</Button>
      </ButtonWrap>
    </RegisterSectionWrap>
  );
}

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <ImageUploadWrap>
      <label htmlFor="fileInput">상품 이미지</label>
      <div onClick={() => document.getElementById("fileInput").click()}>
        {image ? <img src={image} alt="상품 미리보기" /> : null}
      </div>
      <input
        type="file"
        id="fileInput"
        name="productImage"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </ImageUploadWrap>
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

const ImageUploadWrap = styled.div`
  & > div {
    width: 454px;
    height: 454px;
    background-color: #c4c4c4;
    background-image: url(${iconImg});
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  input {
    display: none;
  }
`;

const ProductNameInput = styled.input`
  width: 100%;
  height: 54px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 16px;
`;

function InputWithUnit({ label, unit, name, id }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <InputWrapper>
        <StyledRegisterInput type="text" name={name} id={id} />
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
    border: 1px solid var(--sub-color);
  }
`;
