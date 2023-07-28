import SellChargeList from "components/vendor/sellCharge/sellChargeList";
import { ColumnsType } from "lib/columns/columnsList";
import { StyledToggle } from "lib/styles";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterVendorActions } from "reducers/vendor/masterVendor";
import { checkStatus } from "types/globalTypes";

const SellChargeContainer = () => {
  const { sellChargeList, setOpenStatus } = useAppSelector((state) => ({
    sellChargeList: state.masterVendor.findById,
    setOpenStatus: state.masterVendor.setPnOpenStatus,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { vendorId } = useParams();

  const onSetStatus = (data: object) => {
    dispatch(masterVendorActions.setPnOpenStatus({ ...data }));
  };

  useEffect(() => {
    if (checkStatus(setOpenStatus.status)) {
      dispatch(masterVendorActions.findById(vendorId));
    }
  }, [setOpenStatus]);

  useEffect(() => {
    dispatch(masterVendorActions.findById(vendorId));
    return () => {
      dispatch(masterVendorActions.reset("findById"));
    };
  }, []);

  //*  sellChargeColumns
  const sellChargeColumns: ColumnsType[] = [
    {
      title: "품목명",
      dataIndex: "info",
      render: (info) => info.product.info.nameKr,
    },
    {
      title: "판매 수수료",
      dataIndex: "info",
      render: (info) => info.masterCharge,
    },
    {
      title: "사용상태",
      dataIndex: "info",
      render: (info: any, contentList: any) => {
        const action = () => {
          onSetStatus({
            vendorId,
            id: contentList.id,
            openStatus: info.openStatus == "OPEN" ? "close" : "open",
          });
        };
        return (
          <StyledToggle
            data={info.openStatus}
            openStatus="OPEN"
            action={action}
          />
        );
      },
    },
  ];

  return (
    <SellChargeList
      sellChargeList={
        sellChargeList?.data?.info.bizInfo.info.basic.info.handleProductOwner
          .info.productNums
      }
      sellChargeColumns={sellChargeColumns}
      navigate={navigate}
      vendorId={vendorId}
    />
  );
};

export default SellChargeContainer;
