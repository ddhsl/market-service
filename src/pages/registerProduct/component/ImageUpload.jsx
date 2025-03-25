import React, { useState } from "react";
import styled from "styled-components";

export default function ImageUpload({ onImageChange }) {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      // 미리보기를 위한 URL 생성
      const imageUrl = URL.createObjectURL(uploadedFile);

      // 상태 업데이트
      setImage(imageUrl);

      // 부모 컴포넌트에 파일 객체 전달
      onImageChange(uploadedFile);
    } else {
      // 이미지가 선택되지 않은 경우
      setImage(null);
      onImageChange(null);
    }
  };

  return (
    <ImageUploadWrap>
      <label htmlFor="fileInput">상품 이미지</label>
      <div onClick={() => document.getElementById("fileInput").click()}>
        {image ? (
          <img src={image} alt="상품 미리보기" />
        ) : (
          <div>이미지를 선택해주세요</div>
        )}
      </div>
      <input
        type="file"
        id="fileInput"
        name="productImage"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
    </ImageUploadWrap>
  );
}

const ImageUploadWrap = styled.div`
  & > div {
    width: 454px;
    height: 454px;
    background-color: #c4c4c4;
    color: #fff;
    font-weight: bold;
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
`;
