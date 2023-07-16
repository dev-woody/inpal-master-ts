import { Fragment } from "react";
import styled from "styled-components";
import {
  BreadCrumb,
  Description,
  DescriptionContent,
  Responsive,
  Table,
} from "lib/styles";
import PageHeader from "lib/pages/pageHeader";
import { testVendorOrderData } from "types/data.test";
import { changeDays } from "lib/functions/changeInput";
import { vendorOrderItemColumns } from "lib/columns/columnsList";

const DealerVendorOrderBlock = styled(Responsive)``;

type vendorOrderProps = {
  vendorInfo: any;
  id: string | undefined;
};

const DealerVendorOrder = ({ vendorInfo, id }: vendorOrderProps) => {
  const data = testVendorOrderData[0];
  const item = data?.dealerOrderItem;
  return (
    <Fragment>
      <DealerVendorOrderBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "시공업자 주문 관리 /",
                  url: `/dealer/order`,
                },
                {
                  name: "상세 조회 /",
                  url: `/dealer/order/${id}`,
                },
                {
                  name: "판매사 주문 조회",
                  url: ``,
                },
              ]}
            />
          }
        />
      </DealerVendorOrderBlock>
      <DealerVendorOrderBlock>
        <Description>
          <DescriptionContent label="코드" content={data?.code} />
          <DescriptionContent
            label="결제일"
            content={changeDays(data?.paymentAt)}
          />
          <DescriptionContent label="우편번호" content={data?.addr_zipCode} />
          <DescriptionContent
            label="상세주소"
            content={data?.addr_basic + " " + data?.addr_detail}
          />
          <DescriptionContent label="수령인" content={data?.addr_name} />
          <DescriptionContent label="전화번호" content={data?.addr_phone} />
          <DescriptionContent label="예비번호" content={data?.addr_sub_phone} />
          <DescriptionContent label="주문번호" content={data?.deliveryNum} />
          <DescriptionContent label="메모" content={data?.delivery_memo} />
        </Description>
      </DealerVendorOrderBlock>
      <DealerVendorOrderBlock>
        <PageHeader title="상품 정보" />
        <Description style={{ marginBottom: "1rem" }}>
          <DescriptionContent label="코드" content={item.goodsItem?.code} />
          <DescriptionContent
            label="색상정보"
            content={item.goodsItem?.colorKind}
          />
          <DescriptionContent label="모델명" content={item.goodsItem?.model} />
          <DescriptionContent label="이름" content={item.goodsItem?.name} />
          <DescriptionContent label="사양" content={item.goodsItem?.spec} />
          <DescriptionContent label="주문수량" content={item.goodsItemCount} />
          <DescriptionContent label="금액" content={item.countedPrice} />
          <DescriptionContent
            label="할인 후 금액"
            content={item.countedSalePrice}
          />
          <DescriptionContent
            label="할인가"
            content={item.countedSaleDifferencePrice}
          />
          <DescriptionContent label="옵션가" content={item.optionPrice} />
          <DescriptionContent
            label="배송료"
            content={item.countedDeliveryFee}
          />
          <DescriptionContent label="적립 포인트" content={item.countedPoint} />
          <DescriptionContent
            label="전체주문금액"
            content={item.countedTotalPrice}
          />
        </Description>
        <Table
          columns={vendorOrderItemColumns}
          content={data?.dealerOrderItem?.itemOptions}
          doNoting
        />
      </DealerVendorOrderBlock>
    </Fragment>
  );
};

export default DealerVendorOrder;
