import styled from "styled-components";
import SellerCenterHeader from "../../components/SellerCenterHeader";
import UploadNotice from "./component/UploadNotice";
import RegisterSection from "./component/RegisterSection";

export default function RegisterProduct() {
  return (
    <>
      <SellerCenterHeader />
      <RegisterMain>
        <h2>상품 등록</h2>
        <div style={{ display: "flex", gap: "60px" }}>
          <UploadNotice />
          <RegisterSection />
        </div>
      </RegisterMain>
    </>
  );
}

const RegisterMain = styled.main`
  padding: 0 4%;

  & > h2 {
    padding: 38px 0;
    font-size: 36px;
    font-weight: bold;
  }
`;
