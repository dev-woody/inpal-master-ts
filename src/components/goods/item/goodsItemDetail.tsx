import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Button, Responsive, Table } from "lib/styles";
import { StyledSelect } from "lib/styles";
import styled from "styled-components";
import { testItemData } from "types/data.test";
import {
  changeDays,
  changeOpenStatus,
  changeSellStatus,
} from "lib/functions/changeInput";
import { useForm } from "react-hook-form";
import { sellStatusOption } from "lib/columns/statusColumns";
import { NavigateFunction } from "react-router-dom";
import { response } from "types/globalTypes";
import { ColumnsType } from "lib/columns/columnsList";

const GoodsItemDetailBlock = styled(Responsive)``;

type itemDetailProps = {
  itemInfo: response;
  evaluationList: response;
  evaluationColumn: ColumnsType[];
  navigate: NavigateFunction;
  id: string | undefined;
  itemId: string | undefined;
};

const GoodsItemDetail = ({
  itemInfo,
  evaluationList,
  evaluationColumn,
  navigate,
  id,
  itemId,
}: itemDetailProps) => {
  const data = itemInfo.data;
  const { register, handleSubmit, setValue } = useForm();

  const priceNumsCol: ColumnsType[] = [
    {
      title: "번호",
      dataIndex: "",
      render: (_, __, index) => index,
    },
    {
      title: "정상가",
      dataIndex: "info",
      render: (info) => info.price + "원",
    },
    {
      title: "할인가",
      dataIndex: "info",
      render: (info) => info.salePrice + "원",
    },
    {
      title: "사양",
      dataIndex: "info",
      render: (info) =>
        info.specNum.info.spec.info.quantity +
        info.specNum.info.spec.info.unit.info.nameEn,
    },
  ];
  return (
    <>
      <GoodsItemDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹 관리 /",
                  url: "/goods/group",
                },
                {
                  name: "상세정보 및 수정 /",
                  url: `/goods/group/${id}`,
                },
                {
                  name: "아이템 상세정보",
                  url: "",
                },
              ]}
            />
          }
        />
      </GoodsItemDetailBlock>
      <GoodsItemDetailBlock>
        <Description style={{ marginBottom: "1rem" }}>
          <DescriptionContent label="코드" content={data?.info.code} />
          <DescriptionContent
            label="아이템 명"
            content={data?.info.basic.info.name}
          />
          <DescriptionContent
            label="주문시 환불 불가"
            content={
              data?.info.basic.info.isOrderMade ? "환불불가" : "환불 불가능"
            }
          />
          <DescriptionContent
            label="색상계열"
            content={data?.info.basic.info.colorCode.info.name}
          />
          <DescriptionContent
            label="가상디자인 정보"
            content={
              data?.info.dsInfo.info.dsType === "COLOR"
                ? data?.info.dsInfo.info.rgb
                : ""
            }
          />
          <DescriptionContent
            span="12"
            label="가격정보"
            content={
              <Table
                columns={priceNumsCol}
                content={data?.info?.priceOwner?.info?.priceNums}
                doNoting
              />
            }
          />
          <DescriptionContent
            label="생성일"
            content={changeDays(data?.base.createdAt)}
          />
          <DescriptionContent
            label="수정일"
            content={changeDays(data?.base.updatedAt)}
          />
          <DescriptionContent
            label="판매상태"
            content={changeSellStatus(data?.info.sellStatus)}
          />
        </Description>
        <PageHeader title="리뷰목록" />
        <Table
          columns={evaluationColumn}
          content={evaluationList?.data}
          url={`/goods/group/${id}/item/${itemId}`}
          moveKey={["base", "id"]}
          pagenation
        />
        <Button
          type="button"
          needMarginTop
          withInput
          onClick={() => navigate(`/goods/group/${id}`)}
        >
          뒤로가기
        </Button>
      </GoodsItemDetailBlock>
    </>
  );
};

export default GoodsItemDetail;
