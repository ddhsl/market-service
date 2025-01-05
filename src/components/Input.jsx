import styled from "styled-components";

export default function Input(props) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  width: ${(props) => props.width || "480px"};
  height: 60px;
  border: ${(props) => props.border || "1px solid #c4c4c4"};
  margin: 0 auto;
  border-bottom: ${(props) => props.borderBottom || "none"};
`;
