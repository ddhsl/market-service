import React, { useState } from "react";
import styled from "styled-components";

export default function PurchaseInfoSection() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  return (
    <section style={{ padding: "0 6%" }}>
      <h2 className="sr-only">구매정보</h2>
      <PurchaseInfoWrap>
        {infoLabel.map((label, index) => (
          <PurchaseInfoTab
            key={index}
            onClick={() => handleTabClick(index)}
            $isSelected={selectedTab === index}
          >
            {label}
          </PurchaseInfoTab>
        ))}
      </PurchaseInfoWrap>
      <PurchaseInfo>
        {selectedTab === 0 && <TabContent>버튼 내용</TabContent>}
        {selectedTab === 1 && <TabContent>리뷰 내용</TabContent>}
        {selectedTab === 2 && <TabContent>Q&A 내용</TabContent>}
        {selectedTab === 3 && <TabContent>반품/교환정보 내용</TabContent>}
      </PurchaseInfo>
    </section>
  );
}

const infoLabel = ["버튼", "리뷰", "Q&A", "반품/교환정보"];

const PurchaseInfoWrap = styled.ul`
  display: flex;
  margin-top: 140px;
`;

const PurchaseInfoTab = styled.li`
  width: 100%;
  height: 60px;
  color: var(--sub-color);
  font-weight: bold;
  border-bottom: 6px solid #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: var(--main-color);
  }

  ${(props) =>
    props.$isSelected &&
    `
    border-bottom: 6px solid var(--main-color);
    color: var(--main-color);
  `}
`;

const PurchaseInfo = styled.article`
  width: 100%;
  height: 300px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabContent = styled.div`
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s forwards;
  color: var(--sub-color);

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
