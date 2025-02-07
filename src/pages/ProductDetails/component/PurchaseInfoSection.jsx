import styled from "styled-components";
export default function PurchaseInfoSection() {
  return (
    <section style={{ padding: "0 6%" }}>
      <h2 className="sr-only">구매정보</h2>
      <PurchaseInfoWrap>
        {infoLabel.map((label, index) => (
          <PurchaseInfoTab key={index}>{label}</PurchaseInfoTab>
        ))}
      </PurchaseInfoWrap>
      <PurchaseInfo>내용</PurchaseInfo>
    </section>
  );
}

const infoLabel = ["버튼", "리뷰", "Q&A", "반품/교환정보"];

const PurchaseInfoWrap = styled.ul`
  display: flex;
  margin-top: 140px;
`;

const PurchaseInfoTab = styled.li`
  width: 320px;
  height: 60px;
  color: var(--sub-color);
  font-weight: bold;
  border-bottom: 6px solid #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PurchaseInfo = styled.article`
  width: 100%;
  height: 300px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
