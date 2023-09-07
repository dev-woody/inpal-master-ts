import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { ColumnsType } from "lib/columns/columnsList";
import { changeDays, changeOpenStatus } from "lib/functions/changeInput";
import { masterGoodsGroupActions } from "reducers/goods/goodsGroup";
import { masterProductActions } from "reducers/product/masterProduct";
import GoodsGroup from "components/vendor/goods/group/goodsGroup";

const GoodsGroupContainer = () => {
  const {
    user,
    countGoodsGroup,
    pageGoodsGroupVendor,
    productList,
  } = useAppSelector((store) => ({
    user: store.user,
    productList: store.masterProduct.findAll,
    countGoodsGroup: store.masterGoodsGroup.countGoodsGroupVendor,
    pageGoodsGroupVendor: store.masterGoodsGroup.pageGoodsGroupVendor,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(masterProductActions.findAll(false));
  }, []);

  useEffect(() => {
      dispatch(masterGoodsGroupActions.countGoodsGroupVendor({vendorId: id}));
  }, []);

  useEffect(() => {
      sessionStorage.setItem(
        "groupVendorPageInfo",
        JSON.stringify({
          n: searchParams.get("n"),
          d: searchParams.get("d"),
        })
      );
      dispatch(
        masterGoodsGroupActions.pageGoodsGroupVendor({
          vendorId: id,
          page: atob(searchParams.get("n") || btoa("0")),
          isDesc: atob(searchParams.get("d") || btoa("false")),
          size: 10,
        })
      );
    return () => {
      dispatch(masterGoodsGroupActions.reset("pageGoodsGroupVendor"));
    };
  }, [searchParams.get("n"), searchParams.get("d")]);

  useEffect(() => {
    if (
      (searchParams.get("n") ||
        searchParams.get("d")) === null
    ) {
      navigate(`?n=${btoa("0")}&d=${btoa("false")}`);
    }
  }, [searchParams.get("n"), searchParams.get("d")]);

  const groupColumns: ColumnsType[] = [
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
      title: "그룹명",
      dataIndex: "info",
      render: (info) => info.basic.info.name,
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
      render: (info) => changeOpenStatus(info.openStatus),
    },
  ];

  return (
    <GoodsGroup
      productList={productList}
      countGoodsGroup={countGoodsGroup}
      goodsGroup={pageGoodsGroupVendor}
      groupColumns={groupColumns}
    />
  );
};

export default GoodsGroupContainer;
