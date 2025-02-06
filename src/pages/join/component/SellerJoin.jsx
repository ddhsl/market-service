import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { InputTitle, InputGroup } from "./JoinForm";

export default function SellerJoin() {
  return (
    <>
      <InputTitle style={{ marginTop: "50px" }}>사업자 등록번호</InputTitle>
      <label htmlFor="componyNo" className="sr-only">
        사업자 등록번호를 입력하세요
      </label>
      <InputGroup>
        <Input id="componyNo" name="companyNo" width="346px" />
        <Button>인증</Button>
      </InputGroup>

      <InputTitle>스토어 이름</InputTitle>
      <label htmlFor="storeName" className="sr-only">
        스토어 이름을 입력하세요
      </label>
      <Input id="storeName" name="storeName" />
    </>
  );
}
