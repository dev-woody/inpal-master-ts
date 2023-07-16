import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterAdminActions } from "reducers/admin/masterAdmin";
import ManagerMaster from "components/admin/list/managerMaster";

const MasterContainer = () => {
  const { master, user } = useAppSelector((state) => ({
    master: state.masterAdmin.findAll,
    user: state.user,
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(masterAdminActions.findAll(false));
    return () => {
      dispatch(masterAdminActions.reset("findAll"));
    };
  }, []);
  return <ManagerMaster masterList={master} user={user} />;
};

export default MasterContainer;
