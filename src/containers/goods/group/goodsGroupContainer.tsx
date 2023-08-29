import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodsGroup from "components/goods/group/goodsGroup";
import { ColumnsType } from "lib/columns/columnsList";
import { changeDays, changeOpenStatus } from "lib/functions/changeInput";
import { masterGoodsGroupActions } from "reducers/goods/goodsGroup";

const GoodsGroupContainer = () => {
  const { countGoodsGroup, goodsGroup } = useAppSelector((store) => ({
    countGoodsGroup: store.masterGoodsGroup.countGoodsGroup,
    goodsGroup: store.masterGoodsGroup.pageGoodsGroup,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(masterGoodsGroupActions.countGoodsGroup({}));
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "groupPageInfo",
      JSON.stringify({
        n: searchParams.get("n"),
        d: searchParams.get("d"),
      })
    );
    dispatch(
      masterGoodsGroupActions.pageGoodsGroup({
        page: searchParams.get("n"),
        isDesc: searchParams.get("d"),
        size: 10,
      })
    );
    return () => {
      dispatch(masterGoodsGroupActions.reset("pageGoodsGroup"));
    };
  }, [searchParams.get("n"), searchParams.get("d")]);

  useEffect(() => {
    navigate(`?n=0&d=false`);
  }, []);

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
      countGoodsGroup={countGoodsGroup}
      goodsGroup={goodsGroup}
      groupColumns={groupColumns}
    />
  );
};

export default GoodsGroupContainer;
