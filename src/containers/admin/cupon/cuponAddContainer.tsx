import CuponAdd from "components/admin/cupon/cuponAdd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { masterCuponActions } from "reducers/admin/masterCupon";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const CuponAddContainer = () => {
  const { addResult } = useAppSelector((state) => ({
    addResult: state.masterCupon.register,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = <T,>(data: T) => {
    dispatch(masterCuponActions.register({ ...data }));
  };

  useEffect(() => {
    if (checkStatus(addResult.status)) {
      setModalVisible(true);
      dispatch(masterCuponActions.reset("register"));
    }
  }, [addResult]);

  return (
    <CuponAdd
      addResult={addResult}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default CuponAddContainer;
