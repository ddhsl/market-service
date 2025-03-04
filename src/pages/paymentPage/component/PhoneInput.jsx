import styled from "styled-components";
import { StyledShippingInput } from "./ShippingInput";

export default function PhoneInput({ idPrefix, namePrefix }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <StyledShippingInput
        id={`${idPrefix}-first`}
        name={`${namePrefix}First`}
        width="80px"
      />
      <PhoneSeparator>-</PhoneSeparator>
      <StyledShippingInput
        id={`${idPrefix}-middle`}
        name={`${namePrefix}Middle`}
        width="100px"
      />
      <PhoneSeparator>-</PhoneSeparator>
      <StyledShippingInput
        id={`${idPrefix}-last`}
        name={`${namePrefix}Last`}
        width="100px"
      />
    </div>
  );
}

const PhoneSeparator = styled.span`
  padding: 18px 10px;
`;
