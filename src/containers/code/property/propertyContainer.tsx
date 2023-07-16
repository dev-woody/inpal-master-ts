import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterProductActions } from "reducers/product/masterProduct";
import { masterPropertyActions } from "reducers/product/masterProperty";
import PropertyList from "components/code/property/propertyList";
import { changeDays } from "lib/functions/changeInput";
import { ColumnsType } from "lib/columns/columnsList";

const PropertyContainer = () => {
  const { propertyList, productList } = useAppSelector((state) => ({
    productList: state.masterProduct.findAll,
    propertyList: state.masterProperty.findAllByProductId,
  }));
  const dispatch = useAppDispatch();
  const [productId, setProductId] = useState<string>("");

  const onSelect = (id: string) => {
    setProductId(id);
    dispatch(
      masterPropertyActions.findAllByProductId({ productId: id, isDesc: false })
    );
  };

  useEffect(() => {
    dispatch(masterProductActions.findAll(false));
    dispatch(masterPropertyActions.reset("findAllByProductId"));
    return () => {
      dispatch(masterProductActions.reset("findAll"));
      dispatch(masterPropertyActions.reset("findAllByProductId"));
    };
  }, []);

  const propertyListColumns: ColumnsType[] = [
    {
      title: "속성명",
      dataIndex: "info",
      render: (info) => info.property,
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
  ];

  return (
    <PropertyList
      propertyList={propertyList.data}
      productList={productList.data}
      propertyListColumns={propertyListColumns}
      onSelect={onSelect}
    />
  );
};

export default PropertyContainer;
