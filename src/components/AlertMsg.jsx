import styled from "styled-components";

export default function AlertMsg(props) {
  return <AlertMsgStyle {...props}></AlertMsgStyle>;
}

const AlertMsgStyle = styled.p`
  color: ${(props) => props.color || "#eb5757"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  margin-bottom: 12px;
  /* display: none; */
`;
