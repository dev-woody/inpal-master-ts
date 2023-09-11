import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { useNavigate, useParams } from "react-router-dom";
import PropertyDetail from "components/code/property/propertyDetail";
import { masterPropertyActions } from "reducers/product/masterProperty";
import { DataObj, checkStatus } from "types/globalTypes";
import { masterAdminActions } from "reducers/admin/masterAdmin";

const PropertyDetailContainer = () => {
  const { propertyEdit, propertyDetail, checkPassword } = useAppSelector(
    (state) => ({
      propertyEdit: state.masterProperty.update,
      propertyDetail: state.masterProperty.findById,
      checkPassword: state.masterAdmin.checkPass,
    })
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [inputData, setInputData] = useState<DataObj<string>>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const onCheckPassword = (password: string) => {
    const userId = JSON.parse(localStorage.getItem("masterUser") || "").signInfo
      .userId;
    dispatch(masterAdminActions.checkPass({ userId, password }));
  };

  const onSubmit = (data: DataObj<string>) => {
    setInputData(data);
    onCheckPassword(data.password);
  };

  useEffect(() => {
    if (checkStatus(checkPassword.status)) {
      dispatch(masterPropertyActions.update({ id, ...inputData }));
      dispatch(masterAdminActions.reset("checkPass"));
    }
  }, [checkPassword]);

  useEffect(() => {
    if (checkStatus(propertyEdit.status)) {
      setModalVisible(true);
    }
  }, [propertyEdit]);

  useEffect(() => {
    dispatch(masterPropertyActions.findById(id));
    return () => {
      dispatch(masterPropertyActions.reset("findAllByProductId"));
      dispatch(masterPropertyActions.reset("update"));
    };
  }, []);

  return (
    <PropertyDetail
      propertyDetail={propertyDetail}
      propertyEdit={propertyEdit}
      checkPassword={checkPassword}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default PropertyDetailContainer;
