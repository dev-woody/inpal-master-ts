import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Button, Responsive, Table } from "lib/styles";
import styled from "styled-components";
import {
  changeDays,
  changeSellStatus,
  priceToString,
} from "lib/functions/changeInput";
import { NavigateFunction, useSearchParams } from "react-router-dom";
import { response } from "types/globalTypes";
import { ColumnsType } from "lib/columns/columnsList";

const GoodsItemDetailBlock = styled(Responsive)``;

type itemDetailProps = {
  itemInfo: response;
  evaluationList: response;
  countReview: response;
  evaluationColumn: ColumnsType[];
  navigate: NavigateFunction;
  id: string | undefined;
  groupId: string | undefined;
  itemId: string | undefined;
};

const GoodsItemDetail = ({
  itemInfo,
  evaluationList,
  countReview,
  evaluationColumn,
  navigate,
  id,
  groupId,
  itemId,
}: itemDetailProps) => {
  const data = itemInfo.data;
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(atob(searchParams.get("n") || btoa("0")));
  const vendorInfo = JSON.parse(sessionStorage.getItem("vendorPageInfo") || "{}");
  const { d } = JSON.parse(sessionStorage.getItem("itemPageInfo") || "{}");

  const priceNumsCol: ColumnsType[] = [
    {
      title: "번호",
      dataIndex: "",
      render: (_, __, index) => index,
    },
    {
      title: "정상가",
      dataIndex: "info",
      render: (info) => priceToString(info.price) + "원",
    },
    {
      title: "할인가",
      dataIndex: "info",
      render: (info) => priceToString(info.salePrice) + "원",
    },
    {
      title: "사양",
      dataIndex: "info",
      render: (info) =>
        info.specNum.info.spec.info.quantity +
        info.specNum.info.spec.info.unit.info.nameEn,
    },
  ];

  const groupPageInfo = JSON.parse(
    sessionStorage.getItem("groupPageInfo") || "{}"
  );
  return (
    <>
      <GoodsItemDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "판매사 관리 /",
                  url: `/vendor/list?n=${vendorInfo.n}&d=${vendorInfo.d}`,
                },
                {
                  name: "상세정보 /",
                  url: `/vendor/list/${id}`,
                },
                {
                  name: "상품그룹 관리 /",
                  url: `/vendor/list/${id}/goods/group?n=${groupPageInfo.n}&d=${groupPageInfo.d}&p=${groupPageInfo.p}`,
                },
                {
                  name: "상세정보 및 수정 /",
                  url: `/vendor/list/${id}/goods/group/${groupId}`,
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
          url={`/vendor/list/${id}/goods/group/${groupId}/item/${itemId}`}
          searchParams={searchParams}
          setSearchParams={(page: number) =>
            setSearchParams({
              n: btoa(String(newPageNum + page)),
              d: d,
            })
          }
          moveKey={["base", "id"]}
          pagenation
          pageCount={countReview.data}
        />
        <Button
          type="button"
          needMarginTop
          withInput
          onClick={() => navigate(`/vendor/list/${id}/goods/group/${groupId}`)}
        >
          뒤로가기
        </Button>
      </GoodsItemDetailBlock>
    </>
  );
};

export default GoodsItemDetail;
