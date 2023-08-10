import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterProductActions } from "reducers/product/masterProduct";
import { masterManufacturerActions } from "reducers/product/masterManufecturer";
import ManufacturerList from "components/code/manufacturer/manufacturerList";
import { changeDays } from "lib/functions/changeInput";
import { ColumnsType } from "lib/columns/columnsList";
import { StyledToggle } from "lib/styles";

const ManufacturerContainer = () => {
  const { manufacturerList, productList, setStatus } = useAppSelector(
    (state) => ({
      productList: state.masterProduct.findAll,
      manufacturerList: state.masterManufacturer.findAllByProductId,
      setStatus: state.masterManufacturer.setOpenStatus,
    })
  );
  const dispatch = useAppDispatch();
  const [productId, setProductId] = useState<string>("");

  const onSelect = (id: string) => {
    setProductId(id);
    dispatch(
      masterManufacturerActions.findAllByProductId({
        productId: id,
        isDesc: false,
      })
    );
  };

  const onSetStatus = (data: object) => {
    dispatch(masterManufacturerActions.setOpenStatus({ ...data }));
  };

  useEffect(() => {
    dispatch(
      masterManufacturerActions.findAllByProductId({ productId, isDesc: false })
    );
  }, [setStatus]);

  useEffect(() => {
    dispatch(masterProductActions.findAll(false));
    dispatch(masterManufacturerActions.reset("findAllByProductId"));
    return () => {
      dispatch(masterProductActions.reset("findAll"));
      dispatch(masterManufacturerActions.reset("findAllByProductId"));
    };
  }, []);

  const manufacturerListColumns: ColumnsType[] = [
    {
      title: "번호",
      dataIndex: "",
      render: (_, __, index) => index,
    },
    {
      title: "코드",
      dataIndex: "info",
      render: (info) => info.code,
    },
    {
      title: "제조사 명",
      dataIndex: "info",
      render: (info) => info.basic.info.nameKr,
    },
    {
      title: "제조 국가",
      dataIndex: "info",
      render: (info) => info.basic.info.country,
    },
    {
      title: "생성일",
      dataIndex: "base",
      isDesc: true,
      render: (base) => changeDays(base.createdAt),
    },
    {
      title: "수정일",
      dataIndex: "base",
      isDesc: true,
      render: (base) => changeDays(base.updatedAt),
    },
    {
      title: "판매상태",
      dataIndex: "info",
      render: (info, contentList: any) => {
        const action = () => {
          onSetStatus({
            id: contentList.id,
            openStatus: info.openStatus === "OPEN" ? "close" : "open",
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
    <ManufacturerList
      manufacturerList={manufacturerList.data}
      productList={productList}
      manufacturerListColumns={manufacturerListColumns}
      onSelect={onSelect}
    />
  );
};

export default ManufacturerContainer;
