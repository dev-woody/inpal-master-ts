import styled from "styled-components";
import { Button, ErrorMsg, Modal, PassShowBlock, Responsive } from "lib/styles";
import { StyledInput, StyledForm } from "lib/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { DataObj, checkStatus, response } from "types/globalTypes";

type AddProps = {
  categoryRegister: response;
  checkPassword: response;
  onSubmit: (data: DataObj<string>) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  isCategoryAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

const schema = yup.object({
  name: yup.string().required("카테고리명을 입력해주세요."),
  password: yup.string().required("비밀번호를 입력해주세요."),
});

const CategoryAdd = ({
  categoryRegister,
  checkPassword,
  onSubmit,
  modalVisible,
  setModalVisible,
  isCategoryAdd,
}: AddProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const [isPassShow, setIsPassShow] = useState<boolean>(false);

  useEffect(() => {
    if (checkStatus(categoryRegister.status)) {
      reset();
    }
  }, [categoryRegister]);

  return (
    <div style={{ marginTop: "0.5rem" }}>
      <StyledForm
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log(errors)
        )}
      >
        <StyledInput
          fullWidth
          placeholder="카테고리명"
          label="name"
          register={register}
          errors={errors}
          status={errors.name}
        />
        <StyledInput
          placeholder="비밀번호 확인"
          type={isPassShow ? "text" : "password"}
          endItem={
            <PassShowBlock
              isPassShow={isPassShow}
              setIsPassShow={setIsPassShow}
            />
          }
          label="password"
          register={register}
          fullWidth
          errors={errors}
          status={errors.password}
        />
        <ErrorMsg>{checkPassword.message || categoryRegister.message}</ErrorMsg>
        <Button
          type="submit"
          disabled={isSubmitting}
          status="primary"
          withInput
          fullWidth
        >
          등록
        </Button>
      </StyledForm>
      <Modal
        title="카테고리 등록"
        msg="카테고리 등록을 완료하였습니다."
        submitMsg="확인"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        action={() => isCategoryAdd(false)}
      />
    </div>
  );
};

export default CategoryAdd;
