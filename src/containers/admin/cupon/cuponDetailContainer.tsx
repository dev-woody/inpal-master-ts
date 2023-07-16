import CuponEdit from "components/admin/cupon/cuponEdit";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { masterCuponActions } from "reducers/admin/masterCupon";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const CuponDetailContainer = () => {
  const { editResult, cuponDetail } = useAppSelector((state) => ({
    editResult: state.masterCupon.update,
    // uploadImage: state.uploadImage,
    cuponDetail: state.masterCupon.findById,
  }));
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { id } = useParams();

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? e.target.files : "";
    const formData = new FormData();
    formData.append("image", files[0]);
    // dispatch(masterCuponActions.postUpload({ formData }));
  };

  const onSubmit = <T,>(data: T) => {
    dispatch(
      masterCuponActions.update({
        data: {
          ...data,
          id,
        },
      })
    );
  };

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(masterCuponActions.findById({ id }));
    }
    return () => {
      dispatch(masterCuponActions.reset({}));
    };
  }, []);

  return (
    <CuponEdit
      editResult={editResult}
      // uploadImage={uploadImage}
      cuponDetail={cuponDetail}
      onUpload={onUpload}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default CuponDetailContainer;
