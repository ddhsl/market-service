import styled from "styled-components";
import hoduIcon from "../assets/Logo-hodu.png";
import { Link } from "react-router-dom";
export default function SellerCenterHeader() {
  return (
    <SellerCenterTitle>
      <h1>
        <Link to="/">
          <img src={hoduIcon} alt="Hodu" />
        </Link>

        <p>판매자 센터</p>
      </h1>
    </SellerCenterTitle>
  );
}

const SellerCenterTitle = styled.header`
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.1);
  padding: 0 4%;
  position: relative;
  z-index: 100;
  height: 90px;
  display: flex;
  align-items: center;

  & > h1 {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  & > h1 > a > img {
    width: 80px;
    height: 24px;
  }
  & > h1 > p {
    font-size: 28px;
    font-weight: 500;
  }
`;
