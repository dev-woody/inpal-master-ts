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
    sellChargeList: state.masterVendor.pnList,
    setOpenStatus: state.masterVendor.setPnOpenStatus,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSetStatus = (data: object) => {
    dispatch(masterVendorActions.setPnOpenStatus({ ...data }));
  };

  useEffect(() => {
    if (checkStatus(setOpenStatus.status)) {
      dispatch(masterVendorActions.findById(id));
    }
  }, [setOpenStatus]);

  useEffect(() => {
    dispatch(masterVendorActions.pnList(id));
    return () => {
      dispatch(masterVendorActions.reset("pnList"));
    };
  }, []);

  //*  sellChargeColumns
  const sellChargeColumns: ColumnsType[] = [
    {
      title: "품목명",
      dataIndex: "productNumInfo",
      render: (productNumInfo) => productNumInfo.product.info.nameKr,
    },
    {
      title: "판매 수수료",
      dataIndex: "productNumInfo",
      render: (productNumInfo) => productNumInfo.masterCharge,
    },
    {
      title: "사용상태",
      dataIndex: "productNumInfo",
      render: (productNumInfo: any, contentList: any) => {
        const action = () => {
          onSetStatus({
            id,
            vendorId: contentList.id,
            openStatus: productNumInfo.openStatus == "OPEN" ? "close" : "open",
          });
        };
        return (
          <StyledToggle
            data={productNumInfo.openStatus}
            openStatus="OPEN"
            action={action}
          />
        );
      },
    },
  ];

  return (
    <SellChargeList
      sellChargeList={sellChargeList}
      sellChargeColumns={sellChargeColumns}
      navigate={navigate}
      vendorId={id}
    />
  );
};

export default SellChargeContainer;
