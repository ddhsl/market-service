import styled from "styled-components";
import ActiveItem from "./ActiveItem";

const dashboardLabels = [
  {
    text: "상품정보",
    flex: 5,
  },
  {
    text: "판매가격",
    flex: 2.4,
  },
  {
    text: "수정",
    flex: 1.3,
  },
  {
    text: "삭제",
    flex: 1.3,
  },
];
export default function DashboardSection() {
  return (
    <DashboardWrap>
      <h3 className="sr-only">판매중인 상품</h3>
      <DashboardField>
        {dashboardLabels.map(({ text, flex }) => (
          <DashboardLabel key={text} $flex={flex}>
            {text}
          </DashboardLabel>
        ))}
      </DashboardField>
      <ActiveItem />
    </DashboardWrap>
  );
}

const DashboardWrap = styled.section`
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  background-color: #f2f2f2;
  width: 100%;
  height: 100vh;
`;

const DashboardField = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 30px;
  font-size: 18px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #c4c4c4;
  border-radius: 5px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  background-color: #fff;
`;

const DashboardLabel = styled.p`
  flex: ${({ $flex }) => $flex};
  text-align: center;
`;
