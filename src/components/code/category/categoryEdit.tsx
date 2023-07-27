import PageHeader from "lib/pages/pageHeader";
import {
  Description,
  DescriptionContent,
  ErrorMsg,
  Modal,
  Responsive,
} from "lib/styles";
import { StyledForm, StyledInput, Button, PassShowBlock } from "lib/styles";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { changeDays } from "lib/functions/changeInput";
import { DataObj, checkStatus, response } from "types/globalTypes";

const CategoryEditBlock = styled(Responsive)`
  margin-top: 0 !important;
  margin-left: 1.15rem;
`;

type categoryProps = {
  categoryFindById: response;
  checkPassword: response;
  categoryUpdate: response;
  onSubmit: (data: DataObj<string>) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  description: yup.string().required("카테고리명을 입력해주세요."),
  password: yup.string().required("비밀번호를 입력해주세요."),
});

const CategoryEdit = ({
  categoryFindById,
  checkPassword,
  categoryUpdate,
  onSubmit,
  modalVisible,
  setModalVisible,
}: categoryProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      description: "",
      password: "",
    },
  });
  const [isPassShow, setIsPassShow] = useState<boolean>(false);

  useEffect(() => {
    if (checkStatus(categoryUpdate.status)) {
      reset();
    }
  }, [categoryUpdate]);

  useEffect(() => {
    setValue("description", categoryFindById.data?.info.description);
  }, [categoryFindById]);
  return (
    <div style={{ alignSelf: "stretch" }}>
      <StyledForm
        onSubmit={
          modalVisible
            ? (e) => e.preventDefault()
            : handleSubmit((data) => {
                onSubmit(data);
              })
        }
        style={{ height: "100%", justifyContent: "space-between" }}
      >
        <div>
          <PageHeader title="상세 조회" />
          <Description>
            <DescriptionContent
              label="코드"
              content={categoryFindById.data?.info.code}
            />
            <DescriptionContent
              label="생성일"
              content={changeDays(categoryFindById.data?.base.createdAt)}
            />
            <DescriptionContent
              label="수정일"
              content={changeDays(categoryFindById.data?.base.updatedAt)}
            />
            <DescriptionContent
              label="카테고리명"
              content={
                categoryFindById && (
                  <StyledInput
                    align="vertical"
                    placeholder="카테고리명"
                    label="description"
                    register={register}
                    errors={errors.description?.message}
                    status={errors.description}
                  />
                )
              }
            />
            {categoryFindById && (
              <DescriptionContent
                span="12"
                label="비밀번호 확인"
                content={
                  <StyledInput
                    align="vertical"
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
                    errors={errors.password?.message}
                    status={errors.password}
                  />
                }
              />
            )}
          </Description>
        </div>
        {categoryFindById && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <ErrorMsg style={{ display: "flex", justifyContent: "center" }}>
              {checkPassword.message || categoryUpdate.message}
            </ErrorMsg>
            <Button
              type="submit"
              status="primary"
              needMarginTop
              disabled={isSubmitting}
              withInput
              style={{ alignSelf: "center" }}
            >
              수정
            </Button>
          </div>
        )}
      </StyledForm>
      <Modal
        title="카테고리 수정"
        msg="카테고리 수정이 완료되었습니다."
        submitMsg="확인"
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </div>
  );
};

export default CategoryEdit;
