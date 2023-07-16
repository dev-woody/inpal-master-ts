import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import MasterAdd from "components/admin/list/masterAdd";
import { masterAdminActions } from "reducers/admin/masterAdmin";
import { useNavigate } from "react-router-dom";
import { DataObj } from "types/globalTypes";
import { changePostPhone } from "lib/functions/changeInput";

const MasterRegisterContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { signUp } = useAppSelector((state) => ({
    signUp: state.masterAdmin.signUp,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: DataObj<string>) => {
    dispatch(
      masterAdminActions.signUp({ ...data, phone: changePostPhone(data.phone) })
    );
  };

  useEffect(() => {
    if (signUp.success) {
      dispatch(masterAdminActions.findAll(false));
      setModalVisible(true);
      dispatch(masterAdminActions.reset("signUp"));
    }
  }, [signUp, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(masterAdminActions.reset("findAll"));
    };
  }, []);

  return (
    <MasterAdd
      addResult={signUp.success}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
    />
  );
};

export default MasterRegisterContainer;
