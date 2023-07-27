import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { useParams } from "react-router-dom";
import ManagerMasterDetail from "components/admin/list/managerMasterDetail";
import { masterAdminActions } from "reducers/admin/masterAdmin";
import { changePostPhone } from "lib/functions/changeInput";
import { DataObj, checkStatus } from "types/globalTypes";

const MasterDetailContainer = () => {
  const { user, master, updateResult, changePass } = useAppSelector(
    (state) => ({
      user: state.user,
      master: state.masterAdmin.findByUserId,
      changePass: state.masterAdmin.changePass,
      updateResult: state.masterAdmin.update,
    })
  );
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSubmit = (data: DataObj<string>) => {
    dispatch(
      masterAdminActions.update({
        ...data,
        name: master.data.info.name,
        id: master.data.base.id,
        phone: changePostPhone(data?.phone),
      })
    );
  };

  const onEditPass = (data: any) => {
    dispatch(masterAdminActions.changePass({ ...data }));
  };

  const onReset = (type: string) => {
    dispatch(masterAdminActions.reset(type));
  };

  useEffect(() => {
    if (checkStatus(updateResult.status)) {
      dispatch(masterAdminActions.reset("update"));
      setModalVisible(true);
    }
  }, [updateResult]);

  useEffect(() => {
    dispatch(masterAdminActions.findByUserId(userId));
    return () => {
      dispatch(masterAdminActions.reset("findByUserId"));
    };
  }, []);

  return (
    <ManagerMasterDetail
      user={user}
      master={master}
      changePass={changePass}
      onSubmit={onSubmit}
      onReset={onReset}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      onEditPass={onEditPass}
    />
  );
};

export default MasterDetailContainer;
