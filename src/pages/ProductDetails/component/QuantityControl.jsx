import styled from "styled-components";
import minusIcon from "../../../assets/icon-minus-line.svg";
import plusIcon from "../../../assets/icon-plus-line.svg";
export default function QuantityControl() {
  return (
    <QuantityControlWrap>
      <button>
        <img src={minusIcon} alt="수량 줄이기" />
      </button>
      <div style={{ fontWeight: "bold" }}>1</div>
      <button>
        <img src={plusIcon} alt="수량 늘리기" />
      </button>
    </QuantityControlWrap>
  );
}

const QuantityControlWrap = styled.div`
  display: flex;

  & > button:nth-child(1) {
    border: 1px solid #c4c4c4;
    border-right: none;
    border-radius: 5px 0 0 5px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > div {
    border: 1px solid #c4c4c4;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > button:nth-child(3) {
    border: 1px solid #c4c4c4;
    border-left: none;
    border-radius: 0 5px 5px 0;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
