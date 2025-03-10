// PhoneNumber.jsx - Updated version that preserves UI
import styled from "styled-components";
import PhonePrefix from "./PhonePrefix";
import { useState, useEffect } from "react";

export default function PhoneNumber({
  selectedTab,
  name,
  value,
  onChange,
  onFocus,
}) {
  const [phoneParts, setPhoneParts] = useState({
    prefix: "010",
    middle: "",
    last: "",
  });

  useEffect(() => {
    if (value && value.length >= 3) {
      const prefix = value.slice(0, 3);
      const remaining = value.slice(3);

      let middle = "",
        last = "";
      if (remaining.length <= 4) {
        middle = remaining;
      } else {
        middle = remaining.slice(0, 4);
        last = remaining.slice(4);
      }

      setPhoneParts({ prefix, middle, last });
    } else {
      // Reset
      setPhoneParts({
        prefix: "010",
        middle: "",
        last: "",
      });
    }
  }, [value]);

  const handlePartChange = (part, newValue) => {
    const numericValue = newValue.replace(/[^0-9]/g, "");
    const newPhoneParts = { ...phoneParts, [part]: numericValue };
    setPhoneParts(newPhoneParts);

    const fullPhoneNumber =
      newPhoneParts.prefix + newPhoneParts.middle + newPhoneParts.last;
    const event = {
      target: {
        name,
        value: fullPhoneNumber,
      },
    };

    onChange(event);
  };

  const handlePartFocus = () => {
    if (onFocus) {
      onFocus();
    }
  };

  return (
    <PhoneNumberContainer>
      <PhonePrefix
        selectedTab={selectedTab}
        value={phoneParts.prefix}
        onChange={(e) => handlePartChange("prefix", e.target.value)}
        onFocus={handlePartFocus}
      />
      <PhoneInput
        value={phoneParts.middle}
        onChange={(e) => handlePartChange("middle", e.target.value)}
        onFocus={handlePartFocus}
        maxLength={4}
      />
      <PhoneInput
        value={phoneParts.last}
        onChange={(e) => handlePartChange("last", e.target.value)}
        onFocus={handlePartFocus}
        maxLength={4}
      />
    </PhoneNumberContainer>
  );
}

const PhoneNumberContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const PhoneInput = styled.input`
  width: 152px;
  height: 54px;
  border-radius: 5px;
  border: 1px solid #c4c4c4;
  text-align: center;
  &:focus {
    outline: none;
    border: 1px solid var(--main-color);
  }
`;
