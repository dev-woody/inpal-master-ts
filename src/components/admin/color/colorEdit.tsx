import styled from "styled-components";
import {
  BreadCrumb,
  Description,
  DescriptionContent,
  Modal,
  Responsive,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { StyledForm, StyledInput, Button } from "lib/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { response } from "types/globalTypes";

const ColorEditBlock = styled(Responsive)``;

type colorEditProps = {
  editResult: boolean;
  colorFindByName: response;
  onSubmit: <T>(data: T) => void;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const schema = yup.object({
  rgb: yup
    .string()
    .matches(/(#)/, "#을 입력해주세요.")
    .required("RGB 코드를 입력해주세요."),
  name: yup.string().required("색상명을 입력해주세요."),
});

const ColorEdit = ({
  editResult,
  colorFindByName,
  onSubmit,
  modalVisible,
  setModalVisible,
}: colorEditProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rgb: "",
      name: "",
    },
  });

  useEffect(() => {
    setValue("name", colorFindByName.data?.info.name);
    setValue("rgb", colorFindByName.data?.info.rgb);
  }, [colorFindByName]);

  return (
    <>
      <ColorEditBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "색상 관리 /",
                  url: "/admin/color",
                },
                {
                  name: "상세조회",
                  url: "",
                },
              ]}
            />
          }
        />
      </ColorEditBlock>
      <ColorEditBlock>
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent
              span="12"
              label="헥사코드"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="헥사코드"
                  label="rgb"
                  register={register}
                  errors={errors.rgb?.message}
                  status={errors.rgb}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="색상이름"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="색상이름"
                  label="name"
                  register={register}
                  errors={errors.name?.message}
                  status={errors.name}
                />
              }
            />
          </Description>
          <div>
            <Button
              needMarginTop
              withInput
              onClick={() => navigate("/admin/color")}
            >
              뒤로가기
            </Button>
            <Button
              type="submit"
              status="primary"
              withInput
              needMarginTop
              // disabled={isSubmitting}
            >
              수정
            </Button>
          </div>
        </StyledForm>
        <Modal
          title="색상 수정"
          msg="색상 수정 완료"
          submitMsg="확인"
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          // action={() => navigate(`/admin/color`)}
        />
      </ColorEditBlock>
    </>
  );
};

export default ColorEdit;
