import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterProductActions } from "reducers/product/masterProduct";
import ProductList from "components/code/product/productList";
import { ColumnsType } from "lib/columns/columnsList";
import { changeDays } from "lib/functions/changeInput";
import { StyledToggle } from "lib/styles";

const ProductContainer = () => {
  const { productList, setOpenStatus } = useAppSelector((state) => ({
    productList: state.masterProduct.findAll,
    setOpenStatus: state.masterProduct.setOpenStatus,
  }));
  const dispatch = useAppDispatch();

  const onSetStatus = (data: object) => {
    dispatch(masterProductActions.setOpenStatus({ ...data }));
  };

  useEffect(() => {
    dispatch(masterProductActions.findAll(false));
  }, [setOpenStatus]);

  useEffect(() => {
    dispatch(masterProductActions.reset("findAll"));
    dispatch(masterProductActions.findAll(false));
    return () => {
      dispatch(masterProductActions.reset("findAll"));
    };
  }, []);

  const productListColumns: ColumnsType[] = [
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
    {
      title: "판매상태",
      dataIndex: "info",
      isDesc: true,
      render: (info,contentList: any) => {
        const action = () => {
          onSetStatus({
            id: contentList.base?.id,
            openStatus: info?.openStatus === "OPEN" ? "close" : "open",
          });
        };
        return (
          <StyledToggle
            data={info?.openStatus}
            openStatus="OPEN"
            action={action}
          />
        );
      },
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
