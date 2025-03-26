import styled from "styled-components";

export default function Button(props) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button`
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  background-color: ${({ backgroundColor }) => backgroundColor || "#28d358"};
  color: ${({ color }) => color || "#fff"};
  font-size: ${(props) => props.fontSize};
  font-weight: 700;
  border-radius: 5px;
  margin-top: ${(props) => props.marginTop};
  margin-left: ${(props) => props.marginLeft};
  text-align: center;
  border: ${({ border }) => border || "none"};
  transition: background-color 0.2s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ buttonType, disabled }) =>
      disabled
        ? ""
        : buttonType === "cart"
        ? "var(--sub-color)"
        : buttonType === "cancel"
        ? "#f2f2f2"
        : "#21bf48"};
  }

  &:active {
    background-color: ${({ buttonType, disabled }) =>
      disabled
        ? ""
        : buttonType === "cart"
        ? "#5c5c5c"
        : buttonType === "cancel"
        ? "#e0e0e0"
        : "#1aa03d"};
  }
`;
