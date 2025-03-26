import styled from "styled-components";
import { useOrder } from "../../../context/OrderContext";
import { StyledShippingInput } from "./ShippingInput";

export default function PhoneInput({ idPrefix, namePrefix, isOrderer = true }) {
  const { orderData, updateOrderData } = useOrder();

  const phoneNumber = isOrderer
    ? orderData.ordererPhoneNumber
    : orderData.recipientPhoneNumber;

  const handlePhoneChange = (e, part) => {
    const updateKey = isOrderer ? "ordererPhoneNumber" : "recipientPhoneNumber";

    updateOrderData({
      [updateKey]: {
        ...phoneNumber,
        [part]: e.target.value,
      },
    });
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <StyledShippingInput
        id={`${idPrefix}-first`}
        name={`${namePrefix}First`}
        value={phoneNumber.first}
        onChange={(e) => handlePhoneChange(e, "first")}
        width="80px"
      />
      <PhoneSeparator>-</PhoneSeparator>
      <StyledShippingInput
        id={`${idPrefix}-middle`}
        name={`${namePrefix}Middle`}
        value={phoneNumber.middle}
        onChange={(e) => handlePhoneChange(e, "middle")}
        width="100px"
      />
      <PhoneSeparator>-</PhoneSeparator>
      <StyledShippingInput
        id={`${idPrefix}-last`}
        name={`${namePrefix}Last`}
        value={phoneNumber.last}
        onChange={(e) => handlePhoneChange(e, "last")}
        width="100px"
      />
    </div>
  );
}

const PhoneSeparator = styled.span`
  padding: 18px 10px;
`;
