import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import GoodsItemDetail from "components/goods/item/goodsItemDetail";
import { masterGoodsItemActions } from "reducers/goods/goodsItem";
import { ColumnsType } from "lib/columns/columnsList";
import { checkStatus } from "types/globalTypes";
import { masterGoodsEvaluationActions } from "reducers/goods/goodsEvaluation";
import { StyledToggle } from "lib/styles";

const GoodsItemDetailContainer = () => {
  const { itemInfo, countReview, evaluationList, setOpenStatus } =
    useAppSelector((store) => ({
      itemInfo: store.masterGoodsItem.findById,
      countReview: store.masterGoodsEvaluation.countReview,
      evaluationList: store.masterGoodsEvaluation.pageReview,
      setOpenStatus: store.masterGoodsEvaluation.setOpenStatus,
    }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, itemId } = useParams();
  const [searchParams] = useSearchParams();

  const onSetStatus = (data: any) => {
    dispatch(masterGoodsEvaluationActions.setOpenStatus({ ...data }));
  };

  const evaluationColumn: ColumnsType[] = [
    {
      title: "번호",
      dataIndex: "",
      render: (_, __, index) => index,
    },
    {
      title: "작성자 아이디",
      dataIndex: "info",
      render: (info) => info.clientUserId,
    },
    {
      title: "작성자 타입",
      dataIndex: "info",
      render: (info) => info.clientType,
    },
    {
      title: "평점",
      dataIndex: "info",
      render: (info) => info.score + "점",
    },
    {
      title: "사용상태",
      dataIndex: "info",
      render: (info, contentList: any) => {
        const action = () => {
          onSetStatus({
            id: contentList.base.id,
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

  useEffect(() => {
    if (checkStatus(setOpenStatus.status)) {
      dispatch(
        masterGoodsEvaluationActions.pageReview({
          goodItemId: itemId,
          page: atob(searchParams.get("n") || btoa("0")),
          isDesc: atob(searchParams.get("d") || btoa("false")),
          size: 10,
        })
      );
      dispatch(masterGoodsEvaluationActions.reset("setOpenStatus"));
    }
  }, [setOpenStatus]);

  useEffect(() => {
    if (checkStatus(itemInfo.status)) {
      sessionStorage.setItem(
        "reviewPageInfo",
        JSON.stringify({
          n: searchParams.get("n"),
          d: searchParams.get("d"),
        })
      );
      dispatch(
        masterGoodsEvaluationActions.pageReview({
          goodItemId: itemId,
          page: atob(searchParams.get("n") || btoa("0")),
          isDesc: atob(searchParams.get("d") || btoa("false")),
          size: 10,
        })
      );
      dispatch(masterGoodsEvaluationActions.reset("itemInfo"));
    }
  }, [itemInfo, searchParams.get("n"), searchParams.get("d")]);

  useEffect(() => {
    navigate(`?n=${btoa("0")}&d=${btoa("false")}`);
    dispatch(masterGoodsItemActions.findById(itemId));
    dispatch(masterGoodsEvaluationActions.countReview(itemId));
    return () => {
      dispatch(masterGoodsItemActions.reset("findById"));
    };
  }, []);

  return (
    <GoodsItemDetail
      itemInfo={itemInfo}
      countReview={countReview}
      evaluationList={evaluationList}
      evaluationColumn={evaluationColumn}
      navigate={navigate}
      // onSetSellStatus={onSetSellStatus}
      id={id}
      itemId={itemId}
    />
  );
};

export default GoodsItemDetailContainer;
