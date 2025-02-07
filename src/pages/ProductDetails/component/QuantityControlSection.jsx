import styled from "styled-components";
import QuantityControl from "./QuantityControl";
export default function QuantityControlSection() {
  return (
    <QuantitySection>
      <QuantityControl />
    </QuantitySection>
  );
}

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  width: 630px;
  height: 110px;
  border: 1px solid #c4c4c4;
  border-left: none;
  border-right: none;
  margin-top: 20px;
  margin-bottom: 32px;
`;
