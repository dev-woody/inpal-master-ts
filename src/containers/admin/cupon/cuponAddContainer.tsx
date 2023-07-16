import CuponAdd from "components/admin/cupon/cuponAdd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { masterCuponActions } from "reducers/admin/masterCupon";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";

const CuponAddContainer = () => {
  const { addResult } = useAppSelector((state) => ({
    addResult: state.masterCupon.register,
    // uploadImage: state.uploadImage,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? e.target.files : "";
    const formData = new FormData();
    formData.append("image", files[0]);
    // dispatch(uploadImageActions.postUpload({ formData }));
  };

  const onSubmit = <T,>(data: T) => {
    dispatch(masterCuponActions.register({ data }));
  };

  useEffect(() => {
    if (addResult.success) {
      // dispatch(masterCuponActions.reset({}));
      setModalVisible(true);
    }
  }, [addResult]);

  useEffect(() => {
    return () => {
      // dispatch(masterCuponActions.reset({}));
    };
  }, []);

  return (
    <CuponAdd
      addResult={addResult}
      // uploadImage={uploadImage}
      onUpload={onUpload}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default CuponAddContainer;
