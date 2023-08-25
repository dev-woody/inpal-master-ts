import { Fragment, useEffect } from "react";
import PageHeader from "lib/pages/pageHeader";
import {
  BreadCrumb,
  Button,
  ErrorMsg,
  Modal,
  Responsive,
  StyledForm,
  StyledInput,
  StyledSelect,
  Table,
} from "lib/styles";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import { changeDeliveryStatus, changePhone } from "lib/functions/changeInput";
import { vendorOrderLogColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";
import { NavigateFunction, useParams } from "react-router-dom";
import { deliveryStatusOption } from "lib/columns/statusColumns";

const VendorOrderDetailBlock = styled(Responsive)``;

type orderDetailProps = {
  orderInfo: response;
  orderLog: response;
  setOrderStatus: response;
  onSubmit: (data: object) => void;
  navigate: NavigateFunction;
  id: string | undefined;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
};

const VendorOrderDetail = ({
  orderInfo,
  orderLog,
  setOrderStatus,
  onSubmit,
  navigate,
  id,
  modalVisible,
  setModalVisible,
}: orderDetailProps) => {
  const data = orderInfo?.data?.info;

  const schema = yup.object({
    orderStatus: yup.string().required("주문상태를 선택해주세요."),
    description: yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      orderStatus: "",
      description: "",
    },
  });

  const vendorPageInfo = JSON.parse(
    sessionStorage.getItem("vendorPageInfo") || "{}"
  );
  const orderPageInfo = JSON.parse(
    sessionStorage.getItem("orderPageInfo") || "{}"
  );

  // useEffect(() => {
  //   data?.orderStatus === getValues("orderStatus") &&
  //     setError("orderStatus", {
  //       type: "required",
  //       message: "주문상태를 변경해주세요.",
  //     });
  // }, [handleSubmit]);

  useEffect(() => {
    setValue("description", "");
    // setValue("orderStatus", data?.orderStatus);
  }, [orderInfo]);

  return (
    <Fragment>
      <VendorOrderDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "판매사 관리 /",
                  url: `/vendor/list?pageNum=${vendorPageInfo.pageNum}&isDesc=${vendorPageInfo.isDesc}`,
                },
                {
                  name: "상세정보 /",
                  url: `/vendor/list/${id}`,
                },
                {
                  name: "판매사 주문 관리 /",
                  url: `/vendor/list/${id}/order?pageNum=${orderPageInfo.pageNum}&isDesc=${orderPageInfo.isDesc}`,
                },
                {
                  name: "상세정보",
                  url: "",
                },
              ]}
            />
          }
        />
      </VendorOrderDetailBlock>
      <VendorOrderDetailBlock>
        <PageHeader title="주문 상세정보" />
        <StyledForm
          onSubmit={handleSubmit(
            (data) => onSubmit(data),
            (errors) => console.log(errors)
          )}
        >
          <Description>
            <DescriptionContent label="코드" content={data?.code} />
            <DescriptionContent
              label="주문상태"
              content={
                <StyledSelect
                  align="vertical"
                  placeholder={changeDeliveryStatus(data?.orderStatus)}
                  optionList={deliveryStatusOption}
                  label="orderStatus"
                  register={register}
                  setValue={setValue}
                  getValues={getValues("orderStatus")}
                  errors={errors}
                  status={errors.orderStatus}
                />
              }
            />
            <DescriptionContent
              span="12"
              label="상태변경 메모"
              content={
                <StyledInput
                  align="vertical"
                  placeholder="상태변경 메모"
                  label="description"
                  register={register}
                  errors={errors}
                  status={errors.description}
                />
              }
            />
          </Description>
          <ErrorMsg>{setOrderStatus.message}</ErrorMsg>
          <Button
            type="submit"
            status="primary"
            needMarginTop
            disabled={
              isSubmitting || data?.orderStatus === getValues("orderStatus")
            }
            withInput
            style={{ marginBottom: "1rem" }}
          >
            주문상태 변경
          </Button>
          <Modal
            title="주문상태 수정"
            msg="주문상태 수정을 완료하였습니다."
            submitMsg="확인"
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </StyledForm>
        <PageHeader title="상품정보" />
        <Description style={{ marginBottom: "1rem" }}>
          <DescriptionContent
            label="모델명"
            content={data?.item?.info?.basic?.info?.model}
          />
          <DescriptionContent
            label="상품명"
            content={data?.item?.info?.basic?.info?.name}
          />
          <DescriptionContent
            label="색상그룹"
            content={data?.item?.info?.basic?.info?.colorCode?.info?.name}
          />
          <DescriptionContent
            label="색상코드"
            content={data?.item?.info?.basic?.info?.colorCode?.info?.rgb}
          />
          <DescriptionContent
            label="정상가"
            content={data?.priceNum?.info?.price + "원"}
          />
          <DescriptionContent
            label="할인가"
            content={data?.priceNum?.info?.salePrice + "원"}
          />
          <DescriptionContent
            label="배송료"
            content={
              data?.priceNum?.info?.specNum?.info?.spec?.info?.delivery?.info
                ?.basicFee + "원"
            }
          />
          <DescriptionContent
            label="무료배송조건"
            content={
              data?.priceNum?.info?.specNum?.info?.spec?.info?.delivery?.info
                ?.freeCondition + "원 이상"
            }
          />
          <DescriptionContent
            label="상품사양"
            content={
              data?.priceNum?.info?.specNum?.info?.spec?.info?.quantity +
              data?.priceNum?.info?.specNum?.info?.spec?.info?.unit?.info
                ?.nameEn +
              "(" +
              data?.priceNum?.info?.specNum?.info?.spec?.info?.unit?.info
                ?.nameKr +
              ")"
            }
          />
        </Description>
        <PageHeader title="주문정보" />
        <Description style={{ marginBottom: "1rem" }}>
          <DescriptionContent
            label="주문자"
            content={data?.clientInfo?.clientName}
          />
          <DescriptionContent
            label="주문자타입"
            content={data?.clientInfo?.clientType}
          />
          <DescriptionContent label="주문수량" content={data?.count + "개"} />
          <DescriptionContent
            label="판매수수료"
            content={data?.masterCharge + "%"}
          />
          <DescriptionContent
            label="결제금액"
            content={data?.payAmount + "원"}
          />
          <DescriptionContent
            label="결제총액"
            content={data?.payTotal + "원"}
          />
          <DescriptionContent
            label="우편번호"
            content={data?.address?.info?.addressInfo?.info?.zipCode}
          />
          <DescriptionContent
            label="상세주소"
            content={
              data?.address?.info?.addressInfo?.info?.basic +
              " " +
              data?.address?.info?.addressInfo?.info?.detail
            }
          />
          <DescriptionContent
            label="전화번호"
            content={changePhone(data?.address?.info?.phone)}
          />
          <DescriptionContent
            label="휴대전화"
            content={changePhone(data?.address?.info?.mobile)}
          />
          <DescriptionContent
            label="수령자"
            content={data?.address?.info?.receiver}
          />
          <DescriptionContent
            label="주문자명"
            content={data?.address?.info?.application}
          />
        </Description>
        <PageHeader title="배송상태 기록" />
        <Table
          columns={vendorOrderLogColumns}
          content={orderLog?.data}
          //! 기록도 페이징처리 해야함.
          // pagenation
          // pageCount={countOrder.data}
          doNothing
        />
        <Button
          onClick={() =>
            navigate(
              `/vendor/list/${id}/order?pageNum=${orderPageInfo.pageNum}&isDesc=${orderPageInfo.isDesc}`
            )
          }
          type="button"
          withInput
          needMarginTop
        >
          뒤로가기
        </Button>
      </VendorOrderDetailBlock>
    </Fragment>
  );
};

export default VendorOrderDetail;
