import styled from "styled-components";

export default function Button(props) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button`
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "var(--main-color)"};
  color: ${({ color }) => color || "#fff"};
  font-size: ${(props) => props.fontSize};
  font-weight: 700;
  border-radius: 5px;
  margin-top: ${(props) => props.marginTop};
  margin-left: ${(props) => props.marginLeft};
  text-align: center;
  border: ${({ border }) => border || "none"};
`;
