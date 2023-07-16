import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodsGroup from "components/goods/group/goodsGroup";
import { goodsSearchByKeywordActions } from "reducers/goods/group/serchByKeyword";
import { ColumnsType } from "lib/columns/columnsList";
import { changeDays } from "lib/functions/changeInput";
import { goodsSetSellStatusActions } from "reducers/goods/group/setSellStatus";
import { StyledToggle } from "lib/styles";

const GoodsGroupContainer = () => {
  const { goodsGroup, setOpenStatus } = useAppSelector((state) => ({
    goodsGroup: state.goodsSearchByKeyword,
    setOpenStatus: state.goodsSetSellStatus,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSearch = ({ data }: { data: { keyword: string } }) => {
    dispatch(
      goodsSearchByKeywordActions.getSearchByKeyword({
        keyword: data.keyword,
        isDesc: true,
      })
    );
  };

  const onSetStatus = (data: object) => {
    dispatch(goodsSetSellStatusActions.getSetSellStatus({ ...data }));
  };

  useEffect(() => {
    // dispatch(productFindAllActions.getFindAll({isDesc: false}));
  }, [setOpenStatus]);

  const groupColumns: ColumnsType[] = [
    {
      title: "코드",
      dataIndex: "code",
    },
    {
      title: "그룹명",
      dataIndex: "description",
    },
    {
      title: "생성일",
      dataIndex: "createdAt",
      isDesc: true,
      render: (createdAt: string) => changeDays(createdAt),
    },
    {
      title: "수정일",
      dataIndex: "updatedAt",
      isDesc: true,
      render: (updatedAt: string) => changeDays(updatedAt),
    },
    {
      title: "판매량",
      dataIndex: "sellCount",
      isDesc: true,
    },
    {
      title: "판매상태",
      dataIndex: "sellStatus",
      render: (openStatus: string, contentList: any) => {
        const action = () => {
          onSetStatus({
            vendorId: contentList.vendorId,
            goodGroupId: contentList.id,
            status: openStatus == "OPEN" ? "close" : "open",
          });
        };
        return (
          <StyledToggle data={openStatus} openStatus="OPEN" action={action} />
        );
      },
    },
  ];

  return (
    <GoodsGroup
      goodsGroup={goodsGroup}
      onSearch={onSearch}
      groupColumns={groupColumns}
    />
  );
};

export default GoodsGroupContainer;
