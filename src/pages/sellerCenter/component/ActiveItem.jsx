import styled from "styled-components";
import Button from "../../../components/Button";

export default function ActiveItem() {
  return (
    <ActiveItemWrap>
      <ul>
        <li
          style={{
            flex: 5,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <img src="" alt="이미지" />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <p>딥러닝 개발자 무릎 담요</p>
            <p style={{ fontSize: "16px", color: "var(--sub-color)" }}>
              재고 : 370개
            </p>
          </div>
        </li>
        <li style={{ flex: 2.4, textAlign: "center", fontWeight: "700" }}>
          17,500원
        </li>
        <li style={{ flex: 1.3, textAlign: "center" }}>
          <Button>수정</Button>
        </li>
        <li
          style={{
            flex: 1.3,
            textAlign: "center",
          }}
        >
          <Button
            style={{
              backgroundColor: "#fff",
              color: "var(--sub-color)",
              border: "1px solid #c4c4c4",
            }}
          >
            삭제
          </Button>
        </li>
      </ul>
    </ActiveItemWrap>
  );
}

const ActiveItemWrap = styled.article`
  background-color: #fff;
  border-bottom: 1px solid #c4c4c4;
  padding: 16px 30px;

  & > ul {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 18px;
  }

  & > ul > li {
    display: flex;
    justify-content: center;
    align-items: center;

    & > button {
      width: 80px;
      height: 40px;
      font-size: 16px;
    }
  }
`;
