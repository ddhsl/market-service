import styled from "styled-components";
export default function InputForm(props) {
  return <StyledInputField {...props} />;
}

const StyledInputField = styled.form`
  display: flex;
  flex-direction: column;
  width: 554px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  position: relative;
  top: -10px;
  z-index: 80;
  background-color: #fff;
  padding: 30px 35px 36px;
`;
