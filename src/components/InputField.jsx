import styled from "styled-components";
export default function InputField(props) {
  return <StyledInputField {...props} />;
}

const StyledInputField = styled.form`
  display: flex;
  flex-direction: column;
  width: 554px;
  border: 1px solid #c4c4c4;
  border-radius: 0 10px 10px 10px;
  position: relative;
  top: -20px;
  background-color: #fff;
  padding-top: 30px;
`;
