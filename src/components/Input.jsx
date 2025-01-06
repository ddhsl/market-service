import styled from "styled-components";

export default function Input(props) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  width: ${(props) => props.width || "480px"};
  height: 54px;
  border: ${(props) => props.border || "1px solid #c4c4c4"};
  border-bottom: ${(props) => props.borderBottom};
  border-radius: ${(props) => props.borderRadius || "5px"};
  margin-bottom: ${(props) => props.marginBottom || "12px"};
  padding-left: ${(props) => props.paddingLeft || "16px"};
`;
