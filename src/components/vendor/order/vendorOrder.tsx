import { BreadCrumb, Responsive, StyledSelect } from "lib/styles";
import styled from "styled-components";
import { Table } from "lib/styles/tableStyle";
import { vendorOrderColumns } from "lib/columns/columnsList";
import PageHeader from "lib/pages/pageHeader";
import { response } from "types/globalTypes";
import { useSearchParams } from "react-router-dom";
import { deliveryStatusOptionList } from "lib/columns/statusColumns";
import { changeDeliveryStatusList } from "lib/functions/changeInput";

const VendorOrderBlock = styled(Responsive)``;

type VendorOrderType = {
  countOrder: response;
  orderList: response;
  id: string | undefined;
  onSelect: (status: string) => void;
};

const VendorOrder = ({
  countOrder,
  orderList,
  id,
  onSelect,
}: VendorOrderType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const newPageNum = Number(searchParams.get("pageNum") || "0");
  const vendorPageInfo = JSON.parse(
    sessionStorage.getItem("vendorPageInfo") || "{}"
  );
  const { pageNum, isDesc, status } = JSON.parse(
    sessionStorage.getItem("orderPageInfo") || "{}"
  );
  return (
    <>
      <VendorOrderBlock>
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
                  name: "판매사 주문 관리",
                  url: `?pageNum=${pageNum}&isDesc=${isDesc}`,
                },
              ]}
            />
          }
        />
      </VendorOrderBlock>
      <VendorOrderBlock>
        <Table
          columns={vendorOrderColumns}
          content={orderList.data}
          url={`/vendor/list/${id}/order`}
          searchParams={searchParams}
          setSearchParams={(page: number) =>
            setSearchParams({
              pageNum: String(newPageNum + page),
              isDesc: isDesc,
              status: status,
            })
          }
          moveKey={["base", "id"]}
          pagenation
          pageCount={countOrder.data}
          filter
          filterInput={
            <StyledSelect
              placeholder={changeDeliveryStatusList(status) || "주문 상태별"}
              optionList={deliveryStatusOptionList}
              actions={(status: string) => onSelect(status)}
            />
          }
        />
      </VendorOrderBlock>
    </>
  );
};

export default VendorOrder;
