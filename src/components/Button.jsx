import styled from "styled-components";

export default function Button(props) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: var(--main-color);
  color: #fff;
  font-size: ${(props) => props.fontSize};
  font-weight: 700;
  border-radius: 5px;
  margin-top: ${(props) => props.marginTop};
  text-align: center;
`;
