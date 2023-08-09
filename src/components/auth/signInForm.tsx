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
import { regexId, regexPasswd } from "lib/functions/changeInput";

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
  userId: yup
    .string()
    .matches(regexId, "소문자 하나 숫자 하나 이상 입력해주세요.")
    .required("아이디를 입력해주세요."),
  password: yup
    .string()
    .matches(regexPasswd, "대소문자, 숫자, 특수문자를 하나씩 포함해야합니다.")
    .required("비밀번호를 입력해주세요."),
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
          <ErrorMsg>{isSignIn?.message}</ErrorMsg>
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
