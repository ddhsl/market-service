import styled from "styled-components";
import { useState, useEffect } from "react";
import InputForm from "../../../components/InputForm";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import pwCheckImg from "../../../assets/icon-check-off.svg";
import pwCheckFill from "../../../assets/icon-check-on.svg";
import PhoneNumber from "./PhoneNumber";
import AlertMsg from "../../../components/AlertMsg";
import checkImg from "../../../assets/check-box.svg";
import checkFill from "../../../assets/check-fill-box.svg";
import { API_BASE_URL } from "../../../constants/api";

export default function JoinForm({ formType, selectedTab }) {
  const isJoin = formType === "join";
  const [isAgree, setIsAgree] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isCompanyNoAvailable, setIsCompanyNoAvailable] = useState(false);

  const [joinFormData, setJoinFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone_number: "",
    company_registration_number: "",
    store_name: "",
  });

  const [errors, setErrors] = useState({});

  // 탭 변경 시 입력 데이터 초기화
  const getInitialFormData = (tab) => {
    const baseData = {
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone_number: "",
    };
    return tab === "seller"
      ? { ...baseData, company_registration_number: "", store_name: "" }
      : baseData;
  };

  useEffect(() => {
    setJoinFormData(getInitialFormData(selectedTab));
    setErrors({});
    setIsPasswordValid(false);
    setIsConfirmPasswordValid(false);
    setIsAgree(false);
    setIsUsernameAvailable(false);
    setIsCompanyNoAvailable(false);
  }, [selectedTab]);

  // 동의하기 적용 함수
  const handleAgree = () => {
    setIsAgree((prev) => !prev);
  };

  // 아이디, 사업자등록번호 중복 확인하기
  const checkAvailability = async (field, url, value) => {
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${
          field === "username" ? "아이디" : "사업자등록번호"
        }를 입력하세요.`,
      }));
      return false;
    }
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });

      const data = await response.json();
      if (data.error) {
        setErrors((prev) => ({ ...prev, [field]: data.error }));
        return false;
      }
      setErrors((prev) => ({ ...prev, [field]: null }));
      return true;
    } catch (error) {
      console.error(`${field} 중복 확인 오류:`, error);
      return false;
    }
  };

  const handleCheckUsername = () =>
    checkAvailability(
      "username",
      "/accounts/validate-username/",
      joinFormData.username
    ).then(setIsUsernameAvailable);

  const handleCheckComponyNo = () =>
    checkAvailability(
      "company_registration_number",
      "/accounts/seller/validate-registration-number/",
      joinFormData.company_registration_number
    ).then(setIsCompanyNoAvailable);

  // 입력 필드 순서
  const fieldOrder = [
    "username",
    "password",
    "confirmPassword",
    "name",
    "phone_number",
    "company_registration_number",
    "store_name",
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

    setIsUsernameAvailable(false);

    // 유효성 검사 실행
    const newErrors = validateField(name, value);

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
        delete updatedErrors[name];
      }

      return updatedErrors;
    });
  };

  // 개별 필드 유효성 검사
  const validateField = (field, value) => {
    const newErrors = {};
    if (!value) {
      newErrors[field] = "이 필드는 필수 항목입니다.";
      return newErrors;
    }

    switch (field) {
      case "username":
        if (!/^[A-Za-z0-9]{1,20}$/.test(value))
          newErrors.username =
            "ID는 20자 이내의 영어 소문자, 대문자, 숫자만 가능합니다.";
        break;
      case "password":
        if (value.length < 8)
          newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
        else if (!/(?=.*[a-z])/.test(value))
          newErrors.password =
            "비밀번호에 영소문자가 하나 이상 포함되어야 합니다.";
        else if (!/(?=.*\d)/.test(value))
          newErrors.password = "비밀번호에 숫자가 하나 이상 포함되어야 합니다.";
        else setIsPasswordValid(true);
        break;
      case "confirmPassword":
        if (value !== joinFormData.password)
          newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        else setIsConfirmPasswordValid(true);
        break;
      case "phone_number":
        if (!/^(010)\d{7,8}$/.test(value))
          newErrors.phone_number =
            "핸드폰번호는 01*으로 시작하는 10~11자리 숫자여야 합니다.";
        break;
      case "company_registration_number":
        if (!/^\d{10}$/.test(value))
          newErrors.company_registration_number =
            "사업자등록번호는 10자리 숫자입니다.";
        break;
      default:
        break;
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
    return (
      Object.keys(allErrors).length === 0 &&
      isUsernameAvailable &&
      isCompanyNoAvailable
    );
  };

  // 회원가입하기
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUsernameAvailable) {
      alert("아이디 중복확인을 진행해주세요.");
      return;
    }

    if (selectedTab === "seller" && !isCompanyNoAvailable) {
      alert("사업자등록번호 인증을 진행해주세요.");
      return;
    }

    if (validate()) {
      console.log("폼 데이터가 유효합니다: ", joinFormData);

      // 회원가입에 필요한 데이터 준비
      let joinRequestData = {
        username: joinFormData.username,
        password: joinFormData.password,
        name: joinFormData.name,
        phone_number: joinFormData.phone_number,
      };

      if (selectedTab === "seller") {
        joinRequestData.company_registration_number =
          joinFormData.company_registration_number;
        joinRequestData.store_name = joinFormData.store_name;
      }

      const endpoint =
        selectedTab === "seller"
          ? `${API_BASE_URL}/accounts/seller/signup/`
          : `${API_BASE_URL}/accounts/buyer/signup/`;

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(joinRequestData),
        });

        const data = await response.json();

        if (response.ok) {
          alert("회원가입이 완료되었습니다!");
          window.location.href = "/login";
        } else {
          console.log("회원가입 실패", data);
          alert("회원가입 실패: " + (data.error || "알 수 없는 오류"));
        }
      } catch (error) {
        console.error("회원가입 오류", error.message);
        alert("회원가입 중 오류가 발생했습니다");
      }
    } else {
      console.log("폼 데이터에 오류가 있습니다: ", errors);
      alert("폼 데이터에 오류가 있습니다.");
    }
  };

  return (
    <>
      <JoinFormWrap>
        <InputForm onSubmit={handleSubmit}>
          <InputTitle>아이디</InputTitle>
          <label htmlFor="username" className="sr-only">
            아이디를 입력하세요
          </label>
          <InputGroup>
            <Input
              id="username"
              name="username"
              width="346px"
              value={joinFormData.username || ""}
              onChange={handleChange}
              onFocus={() => handleFocus("username")}
              style={{
                border: errors.username ? "1px solid #EB5757" : "",
              }}
            />
            <Button
              type="button"
              onClick={handleCheckUsername}
              $disabled={errors.username}
            >
              중복확인
            </Button>
          </InputGroup>
          {errors.username && <AlertMsg>{errors.username}</AlertMsg>}
          {!errors.username && isUsernameAvailable && (
            <AlertMsg style={{ color: "var(--main-color)" }}>
              멋진 아이디네요 :)
            </AlertMsg>
          )}

          <InputTitle>비밀번호</InputTitle>
          <label htmlFor="password" className="sr-only">
            비밀번호를 입력하세요
          </label>
          <PwInput
            id="password"
            name="password"
            type="password"
            value={joinFormData.password || ""}
            onChange={handleChange}
            onFocus={() => handleFocus("password")}
            $isValid={isPasswordValid}
            style={{
              border: errors.password ? "1px solid #EB5757" : "",
            }}
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
            value={joinFormData.confirmPassword || ""}
            onChange={handleChange}
            onFocus={() => handleFocus("confirmPassword")}
            $isValid={isConfirmPasswordValid}
            style={{
              border: errors.confirmPassword ? "1px solid #EB5757" : "",
            }}
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
            value={joinFormData.name || ""}
            onChange={handleChange}
            onFocus={() => handleFocus("name")}
            style={{
              border: errors.name ? "1px solid #EB5757" : "",
            }}
          />
          {errors.name && <AlertMsg>{errors.name}</AlertMsg>}

          <InputTitle>휴대폰번호</InputTitle>
          <PhoneNumber
            selectedTab={selectedTab}
            name="phone_number"
            value={joinFormData.phone_number || ""}
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
              <label htmlFor="company_registration_number" className="sr-only">
                사업자 등록번호를 입력하세요
              </label>
              <InputGroup>
                <Input
                  id="company_registration_number"
                  name="company_registration_number"
                  width="346px"
                  value={joinFormData.company_registration_number || ""}
                  onChange={handleChange}
                  onFocus={() => handleFocus("company_registration_number")}
                  style={{
                    border: errors.company_registration_number
                      ? "1px solid #EB5757"
                      : "",
                  }}
                />
                <Button type="button" onClick={handleCheckComponyNo}>
                  인증
                </Button>
              </InputGroup>
              {errors.company_registration_number && (
                <AlertMsg>{errors.company_registration_number}</AlertMsg>
              )}
              {!errors.company_registration_number && isCompanyNoAvailable && (
                <AlertMsg style={{ color: "var(--main-color)" }}>
                  사업자등록번호 인증이 완료됐습니다.
                </AlertMsg>
              )}

              <InputTitle>스토어 이름</InputTitle>
              <label htmlFor="store_name" className="sr-only">
                스토어 이름을 입력하세요
              </label>
              <Input
                id="store_name"
                name="store_name"
                value={joinFormData.store_name || ""}
                onChange={handleChange}
                onFocus={() => handleFocus("store_name")}
                style={{
                  border: errors.store_name ? "1px solid #EB5757" : "",
                }}
              />
              {errors.store_name && <AlertMsg>{errors.store_name}</AlertMsg>}
            </>
          )}
        </InputForm>
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
        $width="480px"
        $height="60px"
        $fontSize="18px"
        onClick={handleSubmit}
        $disabled={!isAgree}
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
    props.$isValid ? pwCheckFill : pwCheckImg});
  background-repeat: no-repeat;
  background-position: right 13px center;
`;
const CheckImg = styled.img`
  margin-right: 10px;
  position: relative;
  top: 28px;
  right: 228px;
`;
