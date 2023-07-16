import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterProductActions } from "reducers/product/masterProduct";
import ProductList from "components/code/product/productList";
import { ColumnsType } from "lib/columns/columnsList";
import { changeDays } from "lib/functions/changeInput";

const ProductContainer = () => {
  const { productList } = useAppSelector((state) => ({
    productList: state.masterProduct.findAll,
  }));
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(masterProductActions.findAll(false));
  // }, [setOpenStatus]);

  useEffect(() => {
    dispatch(masterProductActions.reset("findAll"));
    dispatch(masterProductActions.findAll(false));
    return () => {
      dispatch(masterProductActions.reset("findAll"));
    };
  }, []);

  const productListColumns: ColumnsType[] = [
    {
      title: "코드",
      dataIndex: "info",
      render: (info) => info.code,
    },
    {
      title: "품목명",
      dataIndex: "info",
      render: (info) => info.nameKr,
    },
    {
      title: "영문명",
      dataIndex: "info",
      render: (info) => info.nameEn,
    },
    {
      title: "생성일",
      dataIndex: "base",
      isDesc: true,
      render: (base) => changeDays(base.createdAt),
    },
  ];

  return (
    <ProductList
      productList={productList}
      productListColumns={productListColumns}
    />
  );
};

export default ProductContainer;
