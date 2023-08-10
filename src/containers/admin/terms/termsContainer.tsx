import TermsList from "components/admin/terms/termsList";
import { ColumnsType } from "lib/columns/columnsList";
import { changeDays } from "lib/functions/changeInput";
import { StyledToggle } from "lib/styles";
import { useEffect } from "react";
import { masterTermsActions } from "reducers/admin/masterTerms";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const TermsContainer = () => {
  const { termsList, setStatus } = useAppSelector((state) => ({
    termsList: state.masterTerms.findAll,
    setStatus: state.masterTerms.setOpenStatus,
  }));
  const dispatch = useAppDispatch();

  const onSetStatus = (data: object) => {
    dispatch(masterTermsActions.setOpenStatus(data));
  };

  useEffect(() => {
    if (checkStatus(setStatus.status))
      dispatch(masterTermsActions.findAll(false));
  }, [setStatus]);

  useEffect(() => {
    dispatch(masterTermsActions.findAll(false));
    return () => {
      dispatch(masterTermsActions.reset("findAll"));
    };
  }, []);

  const termsColumns: ColumnsType[] = [
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
          console.log(item);
          onSetStatus({
            id: item.base.id,
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

  return <TermsList termsList={termsList} termsColumns={termsColumns} />;
};

export default TermsContainer;
