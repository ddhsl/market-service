import styled from "styled-components";
import { StyledShippingInput } from "./ShippingInput";

export default function PhoneInput({ idPrefix, namePrefix, value, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <StyledShippingInput
        id={`${idPrefix}-first`}
        name={`${namePrefix}First`}
        value={value?.first || ""}
        onChange={(e) => onChange({ ...value, first: e.target.value })}
        width="80px"
      />
      <PhoneSeparator>-</PhoneSeparator>
      <StyledShippingInput
        id={`${idPrefix}-middle`}
        name={`${namePrefix}Middle`}
        value={value?.middle || ""}
        onChange={(e) => onChange({ ...value, middle: e.target.value })}
        width="100px"
      />
      <PhoneSeparator>-</PhoneSeparator>
      <StyledShippingInput
        id={`${idPrefix}-last`}
        name={`${namePrefix}Last`}
        value={value?.last || ""}
        onChange={(e) => onChange({ ...value, last: e.target.value })}
        width="100px"
      />
    </div>
  );
}
const PhoneSeparator = styled.span`
  padding: 18px 10px;
`;
