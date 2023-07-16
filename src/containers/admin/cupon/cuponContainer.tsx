import CuponList from "components/admin/cupon/cuponList";
import { ColumnsType } from "lib/columns/columnsList";
import { changeDays } from "lib/functions/changeInput";
import { StyledToggle } from "lib/styles";
import { useEffect } from "react";
import { masterCuponActions } from "reducers/admin/masterCupon";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const CuponContainer = () => {
  const { cuponList, setStatus } = useAppSelector((state) => ({
    cuponList: state.masterCupon.findAll,
    setStatus: state.masterCupon.setStatus,
  }));
  const dispatch = useAppDispatch();

  const onSetStatus = (data: object) => {
    dispatch(masterCuponActions.setStatus({ data }));
  };

  useEffect(() => {
    dispatch(masterCuponActions.findAll(false));
  }, [setStatus]);

  useEffect(() => {
    dispatch(masterCuponActions.findAll(false));
    return () => {
      // dispatch(masterCuponActions.reset({}));
    };
  }, []);

  const cuponColumns: ColumnsType[] = [
    {
      title: "종류",
      dataIndex: "kind",
    },
    {
      title: "설명",
      dataIndex: "description",
    },
    {
      title: "잔여일",
      dataIndex: "expirationDays",
      isDesc: true,
      render: (expirationDays) => expirationDays + "일",
    },
    {
      title: "생성일",
      dataIndex: "createdAt",
      isDesc: true,
      render: (createdAt) => changeDays(createdAt),
    },
    {
      title: "수정일",
      dataIndex: "updatedAt",
      isDesc: true,
      render: (updatedAt) => changeDays(updatedAt),
    },
    {
      title: "상태",
      dataIndex: "status",
      render: (openStatus: string, _: any) => {
        const action = () => {
          onSetStatus({
            id: _.id,
            status: openStatus == "OPEN" ? "close" : "open",
          });
        };
        return (
          <StyledToggle data={openStatus} openStatus="OPEN" action={action} />
        );
      },
    },
  ];

  return <CuponList cuponList={cuponList} cuponColumns={cuponColumns} />;
};

export default CuponContainer;
