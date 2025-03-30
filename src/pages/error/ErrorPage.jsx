import styled from "styled-components";
import errorIcon from "../../assets/icon-404.svg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <ErrorWrap>
      <img src={errorIcon} alt="error" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h2>페이지를 찾을 수 없습니다.</h2>
        <p>페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.</p>
        <p>웹 주소가 올바른지 확인해 주세요.</p>
        <div style={{ display: "flex", gap: "14px", marginTop: "40px" }}>
          <Button
            $width="200px"
            $height="60px"
            $fontSize="18px"
            onClick={() => navigate("/")}
          >
            메인으로
          </Button>
          <Button
            $width="200px"
            $height="60px"
            $fontSize="18px"
            $backgroundColor="#fff"
            $color="var(--sub-color)"
            $border="1px solid #c4c4c4"
            $buttonType="cancel"
            onClick={() => navigate(-1)}
          >
            이전 페이지
          </Button>
        </div>
      </div>
    </ErrorWrap>
  );
}

const ErrorWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 53px;

  & > div > h2 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  & > div > p {
    color: var(--sub-color);
  }
`;
