import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterProductActions } from "reducers/product/masterProduct";
import { masterPropertyActions } from "reducers/product/masterProperty";
import PropertyList from "components/code/property/propertyList";
import { changeDays } from "lib/functions/changeInput";
import { ColumnsType } from "lib/columns/columnsList";
import { useNavigate, useSearchParams } from "react-router-dom";

const PropertyContainer = () => {
  const { propertyList, productList } = useAppSelector((state) => ({
    productList: state.masterProduct.findAll,
    propertyList: state.masterProperty.findAllByProductId,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const onSelect = (id: string) => {
    setSearchParams({ p: btoa(id), d: searchParams.get("d") || btoa("false") });
  };

  useEffect(() => {
    dispatch(masterProductActions.findAll(false));
    dispatch(masterPropertyActions.reset("findAllByProductId"));
    return () => {
      dispatch(masterProductActions.reset("findAll"));
      dispatch(masterPropertyActions.reset("findAllByProductId"));
    };
  }, []);

  useEffect(() => {
    if (searchParams.get("p") === btoa("none")) {
      return;
    } else {
      sessionStorage.setItem(
        "property",
        JSON.stringify({ p: searchParams.get("p"), d: searchParams.get("d") })
      );
      dispatch(
        masterPropertyActions.findAllByProductId({
          productId: atob(searchParams.get("p") || btoa("")),
          isDesc: atob(searchParams.get("d") || btoa("false")),
        })
      );
    }
  }, [searchParams.get("p"), searchParams.get("d")]);

  useEffect(() => {
    if ((searchParams.get("p") || searchParams.get("d")) === null) {
      navigate(`?p=${btoa("none")}&d=${btoa("false")}`);
    }
  }, [searchParams.get("p"), searchParams.get("d")]);

  const propertyListColumns: ColumnsType[] = [
    {
      title: "번호",
      dataIndex: "",
      render: (_, __, index) => index,
    },
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
      propertyList={propertyList}
      productList={productList}
      propertyListColumns={propertyListColumns}
      onSelect={onSelect}
    />
  );
};

export default PropertyContainer;
