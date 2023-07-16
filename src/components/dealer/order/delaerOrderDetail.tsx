import { Fragment } from "react";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Responsive, Table } from "lib/styles";
import styled from "styled-components";
import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import { testDealerOrderData } from "types/data.test";
import { changeDays } from "lib/functions/changeInput";
import { dealerOrderDetailColumns } from "lib/columns/columnsList";
import { response } from "types/globalTypes";

const DealerOrderDetailBlock = styled(Responsive)``;

type orderDetailProps = {
  orderInfo: response;
};

const DealerOrderDetail = ({ orderInfo }: orderDetailProps) => {
  const data = testDealerOrderData[0];

  // const optionList = data?.vendorOrder.itemOptions;
  // const allOptionList = () => {
  //   let listName = [];
  //   for (let i = 0; i < optionList?.length; i++) {
  //     listName.push(optionList[i].goodsGroupOption.name);
  //   }
  //   return listName.join(", ");
  // };
  return (
    <Fragment>
      <DealerOrderDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "시공업자 주문 관리 /",
                  url: `/dealer/order`,
                },
                {
                  name: "상세 조회",
                  url: ``,
                },
              ]}
            />
          }
        />
      </DealerOrderDetailBlock>
      <DealerOrderDetailBlock>
        <Description>
          <DescriptionContent label="코드" content={data?.code} />
          <DescriptionContent label="주문수량" content={data?.orderCount} />
          <DescriptionContent label="정가" content={data?.orderPrice} />
          <DescriptionContent label="할인가" content={data?.orderSalePrice} />
          <DescriptionContent
            label="할인금액"
            content={data?.orderSaleDifferencePrice}
          />
          <DescriptionContent
            label="옵션금액"
            content={data?.orderOptionPrice}
          />
          <DescriptionContent label="배송료" content={data?.orderDeliveryFee} />
          <DescriptionContent label="적립포인트" content={data?.orderPoint} />
          <DescriptionContent
            label="생성일"
            content={changeDays(data?.createdAt)}
          />
          <DescriptionContent
            label="수정일"
            content={changeDays(data?.updatedAt)}
          />
          <DescriptionContent
            label="최종금액"
            content={data?.orderTotalPrice}
          />
        </Description>
      </DealerOrderDetailBlock>
      <DealerOrderDetailBlock>
        <PageHeader title="상세주문 리스트" />
        <Table
          columns={dealerOrderDetailColumns}
          content={data?.vendorOrders}
          url="/dealer/order/vendor"
          moveKey="id"
        />
      </DealerOrderDetailBlock>
    </Fragment>
  );
};

export default DealerOrderDetail;
