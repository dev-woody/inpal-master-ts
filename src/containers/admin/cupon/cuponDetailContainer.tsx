import CuponEdit from "components/admin/cupon/cuponEdit";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { masterCuponActions } from "reducers/admin/masterCupon";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const CuponDetailContainer = () => {
  const { editResult, cuponDetail } = useAppSelector((state) => ({
    editResult: state.masterCupon.update,
    cuponDetail: state.masterCupon.findById,
  }));
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { id } = useParams();

  const onSubmit = <T,>(data: T) => {
    dispatch(
      masterCuponActions.update({
        ...data,
        id,
      })
    );
  };

  useEffect(() => {
    if (checkStatus(editResult.status)) {
      setModalVisible(true);
      dispatch(masterCuponActions.reset("register"));
    }
  }, [editResult]);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(masterCuponActions.findById(id));
    }
    return () => {
      dispatch(masterCuponActions.reset("findById"));
    };
  }, []);

  return (
    <CuponEdit
      editResult={editResult}
      cuponDetail={cuponDetail}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default CuponDetailContainer;
