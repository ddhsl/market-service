import styled from "styled-components";

export default function ShippingInput({ id, name, value, onChange }) {
  return (
    <StyledShippingInput
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

export const StyledShippingInput = styled.input`
  width: ${(props) => props.width || "334px"};
  height: 40px;
  border: 1px solid #c4c4c4;
  padding: 10px;
`;
