import CuponList from "components/admin/cupon/cuponList";
import { ColumnsType } from "lib/columns/columnsList";
import { changeDays } from "lib/functions/changeInput";
import { StyledToggle } from "lib/styles";
import { useEffect } from "react";
import { masterCuponActions } from "reducers/admin/masterCupon";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const CuponContainer = () => {
  const { cuponList, setStatus } = useAppSelector((state) => ({
    cuponList: state.masterCupon.findAll,
    setStatus: state.masterCupon.setStatus,
  }));
  const dispatch = useAppDispatch();

  const onSetStatus = (data: object) => {
    dispatch(masterCuponActions.setStatus(data));
  };

  useEffect(() => {
    if (checkStatus(setStatus.status))
      dispatch(masterCuponActions.findAll(false));
  }, [setStatus]);

  useEffect(() => {
    dispatch(masterCuponActions.findAll(false));
    return () => {
      dispatch(masterCuponActions.reset("findAll"));
    };
  }, []);

  const cuponColumns: ColumnsType[] = [
    {
      title: "번호",
      dataIndex: "",
      render: (_, __, index) => index,
    },
    {
      title: "종류",
      dataIndex: "info",
      render: (info) => info.kind,
    },
    {
      title: "설명",
      dataIndex: "info",
      render: (info) => info.description,
    },
    {
      title: "잔여일",
      dataIndex: "info",
      isDesc: true,
      render: (info) => info.expirationDays + "일",
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
      title: "상태",
      dataIndex: "info",
      render: (info: any, item: any) => {
        const action = () => {
          onSetStatus({
            id: item.base.id,
            openStatus: item.info.openStatus === "OPEN" ? "close" : "open",
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

  return <CuponList cuponList={cuponList} cuponColumns={cuponColumns} />;
};

export default CuponContainer;
