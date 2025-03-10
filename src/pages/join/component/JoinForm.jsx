import styled from "styled-components";
import { useState, useEffect } from "react";
import InputField from "../../../components/InputField";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import pwCheckImg from "../../../assets/icon-check-off.svg";
import pwCheckFill from "../../../assets/icon-check-on.svg";
import PhoneNumber from "./PhoneNumber";
import AlertMsg from "../../../components/AlertMsg";
import checkImg from "../../../assets/check-box.svg";
import checkFill from "../../../assets/check-fill-box.svg";

export default function JoinForm({ formType, selectedTab }) {
  const isJoin = formType === "join";
  const [isAgree, setIsAgree] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const handleAgree = () => {
    setIsAgree((prev) => !prev);
  };

  const handleCheckUsername = () => {
    if (!joinFormData.username) {
      setErrors((prev) => ({
        ...prev,
        username: "아이디를 입력하세요.",
      }));
      return;
    }
    console.log("아이디 중복확인 요청: ", joinFormData.username);
  };

  // 탭 변경 시 초기화
  const [joinFormData, setJoinFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone_number: "",
    company_number: "",
    storeName: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // 탭이 변경될 때마다 초기화
    if (selectedTab === "buyer") {
      setJoinFormData({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        phone_number: "",
      });
    } else if (selectedTab === "seller") {
      setJoinFormData({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        phone_number: "",
        company_number: "",
        storeName: "",
      });
    }

    // 에러 메시지 초기화
    setErrors({});

    setIsPasswordValid(false);
    setIsConfirmPasswordValid(false);

    // 동의하기 초기화
    setIsAgree(false);
  }, [selectedTab]);

  // 입력 필드 순서
  const fieldOrder = [
    "username",
    "password",
    "confirmPassword",
    "name",
    "phone_number",
    "company_number",
    "storeName",
  ];

  // onFocus 핸들러: 현재 포커스된 필드보다 위에 있는 필드들의 값이 없으면 에러 메시지를 설정
  const handleFocus = (fieldName) => {
    const index = fieldOrder.indexOf(fieldName);
    const newErrors = {};

    for (let i = 0; i < index; i++) {
      const prevField = fieldOrder[i];
      if (!joinFormData[prevField]) {
        newErrors[prevField] = "이 필드는 필수 항목입니다.";
      }
    }

    setErrors((prev) => ({
      ...prev,
      ...newErrors,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJoinFormData((prev) => {
      return { ...prev, [name]: value };
    });

    // 유효성 검사 실행
    const newErrors = validateField(name, value);

    // 비밀번호가 비어있는 경우 체크이미지 상태를 초기화
    if (name === "password" && !value) {
      setIsPasswordValid(false);
    }

    if (name === "confirmPassword" && !value) {
      setIsConfirmPasswordValid(false);
    }

    // 기존 에러와 합쳐서 상태 업데이트
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors, ...newErrors };

      // 유효성 검사 통과 시 해당 필드의 에러를 삭제
      if (!newErrors[name]) {
        delete updatedErrors[name]; // 에러 메시지가 없으면 해당 필드를 삭제
      }

      return updatedErrors;
    });
  };

  // 개별 필드 유효성 검사

  const validateField = (fieldName, value) => {
    const newErrors = {};
    const usernameRegex = /^[A-Za-z0-9]{1,20}$/;
    const phoneRegex = /^(010)\d{7,8}$/;
    const companyNoRegex = /^\d{10}$/;

    if (!value) {
      newErrors[fieldName] = "이 필드는 필수 항목입니다.";
      return newErrors;
    }

    if (fieldName === "username" && !usernameRegex.test(value)) {
      newErrors.username =
        "ID는 20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다.";
    } else if (fieldName === "password") {
      if (value.length < 8) {
        newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
      } else if (!/(?=.*[a-z])/.test(value)) {
        newErrors.password =
          "비밀번호는 한개 이상의 영소문자가 필수적으로 들어가야 합니다.";
      } else if (!/(?=.*\d)/.test(value)) {
        newErrors.password =
          "비밀번호는 한개 이상의 숫자가 필수적으로 들어가야 합니다.";
      } else {
        setIsPasswordValid(true);
      }
    } else if (fieldName === "confirmPassword") {
      if (value !== joinFormData.password) {
        newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      } else {
        setIsConfirmPasswordValid(true);
      }
    } else if (fieldName === "phone_number" && !phoneRegex.test(value)) {
      newErrors.phone_number =
        "핸드폰번호는 01*으로 시작해야 하는 10~11자리 숫자여야 합니다.";
    } else if (fieldName === "company_number" && !companyNoRegex.test(value)) {
      newErrors.company_number = "사업자등록번호는 10자리 숫자입니다.";
    }

    return newErrors;
  };

  // 전체 폼 유효성 검사
  const validate = () => {
    const allErrors = {};
    Object.keys(joinFormData).forEach((field) => {
      const fieldErrors = validateField(field, joinFormData[field]);
      Object.assign(allErrors, fieldErrors);
    });

    setErrors(allErrors);
    return Object.keys(allErrors).length === 0; // 에러가 없다면 유효성 통과
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // 유효성 통과 시 API 호출 등 로직 수행
      console.log("폼 데이터가 유효합니다: ", joinFormData);
    } else {
      console.log("폼 데이터에 오류가 있습니다: ", errors);
    }
  };

  return (
    <>
      <JoinFormWrap>
        <form onSubmit={handleSubmit}>
          <InputField>
            <InputTitle>아이디</InputTitle>
            <label htmlFor="username" className="sr-only">
              아이디를 입력하세요
            </label>
            <InputGroup>
              <Input
                id="username"
                name="username"
                width="346px"
                value={joinFormData.username}
                onChange={handleChange}
                onFocus={() => handleFocus("username")}
              />
              <Button type="button" onClick={handleCheckUsername}>
                중복확인
              </Button>
            </InputGroup>
            {errors.username && <AlertMsg>{errors.username}</AlertMsg>}

            <InputTitle>비밀번호</InputTitle>
            <label htmlFor="password" className="sr-only">
              비밀번호를 입력하세요
            </label>
            <PwInput
              id="password"
              name="password"
              type="password"
              value={joinFormData.password}
              onChange={handleChange}
              onFocus={() => handleFocus("password")}
              isValid={isPasswordValid}
            />
            {errors.password && <AlertMsg>{errors.password}</AlertMsg>}

            <InputTitle>비밀번호 재확인</InputTitle>
            <label htmlFor="confirmPassword" className="sr-only">
              비밀번호를 재입력하세요
            </label>
            <PwInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={joinFormData.confirmPassword}
              onChange={handleChange}
              onFocus={() => handleFocus("confirmPassword")}
              isValid={isConfirmPasswordValid}
            />
            {errors.confirmPassword && (
              <AlertMsg>{errors.confirmPassword}</AlertMsg>
            )}

            <InputTitle style={{ marginTop: "40px" }}>이름</InputTitle>
            <label htmlFor="name" className="sr-only">
              이름을 입력하세요
            </label>
            <Input
              id="name"
              name="name"
              value={joinFormData.name}
              onChange={handleChange}
              onFocus={() => handleFocus("name")}
            />
            {errors.name && <AlertMsg>{errors.name}</AlertMsg>}

            <InputTitle>휴대폰번호</InputTitle>
            <PhoneNumber
              selectedTab={selectedTab}
              name="phone_number"
              value={joinFormData.phone_number}
              onChange={handleChange}
              onFocus={() => handleFocus("phone_number")}
            />
            {errors.phone_number && (
              <AlertMsg style={{ marginTop: "13px" }}>
                {errors.phone_number}
              </AlertMsg>
            )}

            {isJoin && selectedTab === "seller" && (
              <>
                <InputTitle style={{ marginTop: "50px" }}>
                  사업자 등록번호
                </InputTitle>
                <label htmlFor="companyNo" className="sr-only">
                  사업자 등록번호를 입력하세요
                </label>
                <InputGroup>
                  <Input
                    id="companyNo"
                    name="company_number"
                    width="346px"
                    value={joinFormData.company_number}
                    onChange={handleChange}
                    onFocus={() => handleFocus("company_number")}
                  />
                  <Button>인증</Button>
                </InputGroup>
                {errors.company_number && (
                  <AlertMsg>{errors.company_number}</AlertMsg>
                )}

                <InputTitle>스토어 이름</InputTitle>
                <label htmlFor="storeName" className="sr-only">
                  스토어 이름을 입력하세요
                </label>
                <Input
                  id="storeName"
                  name="storeName"
                  value={joinFormData.storeName}
                  onChange={handleChange}
                  onFocus={() => handleFocus("storeName")}
                />
                {errors.storeName && <AlertMsg>{errors.storeName}</AlertMsg>}
              </>
            )}
          </InputField>
        </form>
      </JoinFormWrap>
      <CheckImg
        onClick={handleAgree}
        src={isAgree ? checkFill : checkImg}
        alt="동의하기"
      />
      <p>
        호두샵의 <span>이용약관</span> 및 <span>개인정보처리방침</span>에 대한
        내용을 확인하였고 동의합니다.
      </p>
      <Button
        type="submit"
        width="480px"
        height="60px"
        fontSize="18px"
        onClick={handleSubmit}
        disabled={!isAgree}
        style={{
          backgroundColor: !isAgree ? "#c4c4c4" : "",
        }}
      >
        가입하기
      </Button>
    </>
  );
}

const JoinFormWrap = styled.div`
  & input:focus {
    border: 1px solid var(--main-color);
  }
`;

export const InputTitle = styled.p`
  margin-bottom: 10px;
  color: var(--sub-color);
`;

export const InputGroup = styled.div`
  display: flex;
  & > Button {
    width: 122px;
    height: 54px;
    margin-left: 12px;
  }
`;

const PwInput = styled(Input)`
  background-image: url(${(props) =>
    props.isValid ? pwCheckFill : pwCheckImg});
  background-repeat: no-repeat;
  background-position: right 13px center;
`;

const CheckImg = styled.img`
  margin-right: 10px;
  position: relative;
  top: 28px;
  right: 228px;
`;
