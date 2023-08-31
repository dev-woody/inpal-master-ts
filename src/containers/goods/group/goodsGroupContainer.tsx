import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodsGroup from "components/goods/group/goodsGroup";
import { ColumnsType } from "lib/columns/columnsList";
import { changeDays, changeOpenStatus } from "lib/functions/changeInput";
import { masterGoodsGroupActions } from "reducers/goods/goodsGroup";
import { masterProductActions } from "reducers/product/masterProduct";
import { checkStatus } from "types/globalTypes";

const GoodsGroupContainer = () => {
  const {
    countGoodsGroup,
    goodsGroup,
    productList,
    countGroupProduct,
    pageGroupProduct,
  } = useAppSelector((store) => ({
    productList: store.masterProduct.findAll,
    countGoodsGroup: store.masterGoodsGroup.countGoodsGroup,
    goodsGroup: store.masterGoodsGroup.pageGoodsGroup,
    countGroupProduct: store.masterGoodsGroup.countGroupProduct,
    pageGroupProduct: store.masterGoodsGroup.pageGroupProduct,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState<any>({ data: {} });
  const [page, setPage] = useState<any>({ data: {} });

  const onSelect = (id: string) => {
    setSearchParams({
      n: btoa("0"),
      d: btoa("false"),
      p: btoa(id),
    });
  };

  useEffect(() => {
    dispatch(masterProductActions.findAll(false));
  }, []);

  useEffect(() => {
    if (atob(searchParams.get("p") || "ALL") === "ALL") {
      dispatch(masterGoodsGroupActions.countGoodsGroup({}));
    } else {
      dispatch(
        masterGoodsGroupActions.countGroupProduct({
          productId: atob(searchParams.get("p") || btoa("ALL")),
        })
      );
    }
  }, [searchParams.get("p")]);

  useEffect(() => {
    if (atob(searchParams.get("p") || "ALL") === "ALL") {
      sessionStorage.setItem(
        "groupPageInfo",
        JSON.stringify({
          n: searchParams.get("n"),
          d: searchParams.get("d"),
          p: searchParams.get("p"),
        })
      );
      dispatch(
        masterGoodsGroupActions.pageGoodsGroup({
          page: atob(searchParams.get("n") || btoa("0")),
          isDesc: atob(searchParams.get("d") || btoa("false")),
          size: 10,
        })
      );
    } else {
      sessionStorage.setItem(
        "groupPageInfo",
        JSON.stringify({
          n: searchParams.get("n"),
          d: searchParams.get("d"),
          p: searchParams.get("p"),
        })
      );
      dispatch(
        masterGoodsGroupActions.pageGroupProduct({
          page: atob(searchParams.get("n") || btoa("0")),
          isDesc: atob(searchParams.get("d") || btoa("false")),
          productId: atob(searchParams.get("p") || btoa("ALL")),
          size: 10,
        })
      );
    }
    return () => {
      dispatch(masterGoodsGroupActions.reset("pageGoodsGroup"));
    };
  }, [searchParams.get("n"), searchParams.get("d"), searchParams.get("p")]);

  useEffect(() => {
    if (
      (searchParams.get("n") ||
        searchParams.get("d") ||
        searchParams.get("p")) === null
    ) {
      navigate(`?n=${btoa("0")}&d=${btoa("false")}&p=${btoa("ALL")}`);
    }
  }, [searchParams.get("n"), searchParams.get("d"), searchParams.get("p")]);

  useEffect(() => {
    if (checkStatus(countGoodsGroup.status)) {
      setCount(countGoodsGroup);
      dispatch(masterGoodsGroupActions.reset("countGroupProduct"));
    }
    if (checkStatus(countGroupProduct.status)) {
      setCount(countGroupProduct);
      dispatch(masterGoodsGroupActions.reset("countGoodsGroup"));
    }
  }, [countGoodsGroup, countGroupProduct]);

  useEffect(() => {
    if (checkStatus(goodsGroup.status)) {
      setPage(goodsGroup);
      dispatch(masterGoodsGroupActions.reset("pageGroupProduct"));
    }
    if (checkStatus(pageGroupProduct.status)) {
      setPage(pageGroupProduct);
      dispatch(masterGoodsGroupActions.reset("goodsGroup"));
    }
  }, [goodsGroup, pageGroupProduct]);

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
      countGoodsGroup={count}
      goodsGroup={page}
      groupColumns={groupColumns}
      onSelect={onSelect}
    />
  );
};

export default GoodsGroupContainer;
