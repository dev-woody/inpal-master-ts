import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  StyledForm,
  StyledInput,
  PassShowBlock,
  ErrorMsg,
} from "lib/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PageHeader from "lib/pages/pageHeader";
import { DataObj, response } from "types/globalTypes";
import IconLogo from "logo-row.png";
import LogoTypo from "logo-typo.png";

import { BiUser, BiLock } from "react-icons/bi";
import { ResponseData } from "reducers/createAsyncReducers";
import { Link } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";

const SignInBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignInFormBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border-radius: 0.75rem;
  background-color: #fff;
  max-width: 400px;
`;

type SignInProps = {
  isSignIn: ResponseData;
  onSubmit: (data: DataObj<string>) => void;
};

const schema = yup.object({
  userId: yup.string().required("아이디를 입력해주세요."),
  password: yup.string().required("비밀번호를 입력해주세요."),
});

const SignInForm = ({ isSignIn, onSubmit }: SignInProps) => {
  const [isPassShow, setIsPassShow] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  // useEffect(() => {
  //   switch (isSignIn.message) {
  //     case "사용자 아이디가 존재하지 않습니다. 로그인을 확인하세요.":
  //       setError(
  //         "userId",
  //         { type: "focus", message: "존재하지않는 아이디입니다." },
  //         { shouldFocus: true }
  //       );
  //       break;
  //     case "관리자 비밀번호가 다릅니다.\n비밀번호를 확인해 주세요.!":
  //       setError(
  //         "password",
  //         { type: "focus", message: "잘못된 비밀번호입니다." },
  //         { shouldFocus: true }
  //       );
  //       break;
  //     case "사용자 비밀번호는 대문자가 최소 1개 존재 해야 합니다.!":
  //       setError(
  //         "password",
  //         {
  //           type: "focus",
  //           message: "비밀번호는 대문자가 최소 1개 존재 해야 합니다.",
  //         },
  //         { shouldFocus: true }
  //       );
  //       break;
  //   }
  // }, [isSignIn, errors]);

  return (
    <SignInBlock>
      <SignInFormBlock>
        <Link
          to="/"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <img src={LogoTypo} width={"65%"} />
        </Link>
        <StyledForm onSubmit={handleSubmit((data) => onSubmit(data))}>
          <StyledInput
            placeholder="아이디"
            fullWidth
            startItem={<BiUser />}
            label="userId"
            register={register}
            errors={errors}
            status={errors.userId}
          />
          <StyledInput
            placeholder="비밀번호"
            type={isPassShow ? "text" : "password"}
            fullWidth
            startItem={<BiLock />}
            endItem={
              <PassShowBlock
                isPassShow={isPassShow}
                setIsPassShow={setIsPassShow}
              />
            }
            label="password"
            register={register}
            errors={errors}
            status={errors.password}
          />
          <ErrorMsg>{isSignIn?.error}</ErrorMsg>
          <Button
            type="submit"
            status="primary"
            fullWidth={true}
            disabled={isSubmitting}
            needMarginTop
          >
            로그인
          </Button>
        </StyledForm>
      </SignInFormBlock>
    </SignInBlock>
  );
};

export default SignInForm;
