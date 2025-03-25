import styled from "styled-components";
import SellerCenterHeader from "../../components/SellerCenterHeader";
import Button from "../../components/Button";
import iconPlus from "../../assets/icon-plus.svg";
import DashboardAside from "./component/DashboardAside";
import DashboardSection from "./component/DashboardSection";
import { useNavigate } from "react-router-dom";

export default function SellerCenter() {
  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <SellerCenterHeader />
      <DashboardMain>
        <div>
          <h2>
            대시보드 <span>백엔드글로벌</span>
          </h2>
          <Button onClick={navigateToRegister}>상품 업로드</Button>
        </div>
        <div style={{ display: "flex", gap: "30px" }}>
          <DashboardAside />
          <DashboardSection />
        </div>
      </DashboardMain>
    </>
  );
}

const DashboardMain = styled.main`
  padding: 0 4%;
  padding-bottom: 4%;

  & > div:nth-child(1) {
    padding: 38px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > button {
      width: 168px;
      height: 54px;
      font-size: 18px;
      padding-left: 30px;
      background-image: url(${iconPlus});
      background-repeat: no-repeat;
      background-position: left 14px top 10px;
    }

    & > h2 {
      font-size: 36px;
      font-weight: bold;

      & > span {
        color: var(--main-color);
        font-weight: 500;
        margin-left: 10px;
      }
    }
  }
`;
