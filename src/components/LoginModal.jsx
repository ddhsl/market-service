import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import closeIcon from "../assets/icon-delete.svg";

export default function LoginModal({ onClose }) {
  const modalRef = useRef();
  const navigate = useNavigate();

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleNoClick = () => {
    onClose();
  };

  const handleYesClick = () => {
    navigate("/login");
  };

  return (
    <ModalBackdrop onClick={handleBackdropClick}>
      <LoginModalWrap ref={modalRef}>
        <CloseIcon src={closeIcon} alt="닫기" onClick={handleNoClick} />
        <p>로그인이 필요한 서비스입니다.</p>
        <p>로그인 하시겠습니까?</p>
        <div>
          <Button
            width="100px"
            height="40px"
            backgroundColor="#fff"
            color="var(--sub-color)"
            border="1px solid #c4c4c4"
            buttonType="cancel"
            onClick={handleNoClick}
          >
            아니오
          </Button>
          <Button width="100px" height="40px" onClick={handleYesClick}>
            예
          </Button>
        </div>
      </LoginModalWrap>
    </ModalBackdrop>
  );
}

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoginModalWrap = styled.div`
  position: relative;
  border: 1px solid #c4c4c4;
  background-color: #fff;
  width: 360px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  & > div {
    display: flex;
    gap: 10px;
    margin-top: 25px;
  }
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 18px;
  right: 18px;
  cursor: pointer;
`;
