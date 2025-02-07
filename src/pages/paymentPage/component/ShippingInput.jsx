import styled from "styled-components";

export default function ShippingInput() {
  return <StyledShippingInput />;
}

export const StyledShippingInput = styled.input`
  width: ${(props) => props.width || "334px"};
  height: 40px;
  border: 1px solid #c4c4c4;
`;
