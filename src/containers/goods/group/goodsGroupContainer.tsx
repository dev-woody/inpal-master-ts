import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodsGroup from "components/goods/group/goodsGroup";
import { ColumnsType } from "lib/columns/columnsList";
import { changeDays, changeOpenStatus } from "lib/functions/changeInput";
import { StyledToggle } from "lib/styles";
import { masterGoodsGroupActions } from "reducers/goods/goodsGroup";

const GoodsGroupContainer = () => {
  const { goodsGroup } = useAppSelector((state) => ({
    goodsGroup: state.masterGoodsGroup.findAll,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(masterGoodsGroupActions.findAll(false));
    return () => {
      dispatch(masterGoodsGroupActions.reset("findAll"));
    };
  }, []);

  const groupColumns: ColumnsType[] = [
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
      // render: (info: any, contentList: any) => {
      //   const action = () => {
      //     onSetStatus({
      //       vendorId: contentList.info.vendorId,
      //       goodGroupId: contentList.base.id,
      //       openStatus: info.openStatus == "OPEN" ? "close" : "open",
      //     });
      //   };
      //   return (
      //     <StyledToggle
      //       data={info.openStatus}
      //       openStatus="OPEN"
      //       action={action}
      //     />
      //   );
      // },
    },
  ];

  return <GoodsGroup goodsGroup={goodsGroup} groupColumns={groupColumns} />;
};

export default GoodsGroupContainer;
