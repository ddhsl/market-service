import styled from "styled-components";
import SellerCenterHeader from "../../components/SellerCenterHeader";
import UploadNotice from "./component/UploadNotice";
import RegisterSection from "./component/RegisterSection";
import { useParams } from "react-router-dom";

export default function RegisterProduct() {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  return (
    <>
      <SellerCenterHeader />
      <RegisterMain>
        <h2>{isEditMode ? "상품 수정" : "상품 등록"}</h2>
        <div style={{ display: "flex", gap: "60px" }}>
          <UploadNotice />
          <RegisterSection isEditMode={isEditMode} productId={id} />
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
