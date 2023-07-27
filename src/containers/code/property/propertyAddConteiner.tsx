import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterAdminActions } from "reducers/admin/masterAdmin";
import { masterPropertyActions } from "reducers/product/masterProperty";
import PropertyAdd from "components/code/property/propertyAdd";
import { useNavigate } from "react-router-dom";
import { masterProductActions } from "reducers/product/masterProduct";
import { DataObj, checkStatus } from "types/globalTypes";

const PropertyAddContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { productList, register, checkPassword } = useAppSelector((state) => ({
    productList: state.masterProduct.findAll,
    register: state.masterProperty.register,
    checkPassword: state.masterAdmin.checkPass,
  }));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [inputData, setInputData] = useState<DataObj<string>>();

  const onCheckPassword = (password: string) => {
    const userId = JSON.parse(localStorage.getItem("user") || "").signInfo
      .userId;
    dispatch(masterAdminActions.checkPass({ userId, password }));
  };

  const onSubmit = (data: DataObj<string>) => {
    setInputData(data);
    onCheckPassword(data.password);
  };

  useEffect(() => {
    if (checkStatus(checkPassword.status)) {
      dispatch(masterPropertyActions.register(inputData));
      dispatch(masterAdminActions.reset("checkPass"));
    }
  }, [checkPassword]);

  useEffect(() => {
    if (checkStatus(register.status)) {
      dispatch(
        masterPropertyActions.findAllByProductId({
          productId: inputData?.productId,
          isDesc: false,
        })
      );
      setModalVisible(true);
      dispatch(masterPropertyActions.reset("register"));
    }
  }, [register]);

  useEffect(() => {
    dispatch(masterAdminActions.reset("checkPass"));
    dispatch(masterPropertyActions.reset("register"));
    return () => {
      dispatch(masterAdminActions.reset("checkPass"));
      dispatch(masterPropertyActions.reset("register"));
    };
  }, []);

  useEffect(() => {
    dispatch(masterProductActions.findAll(false));
    dispatch(masterPropertyActions.reset("findAllByProductId"));
    return () => {
      dispatch(masterProductActions.reset("findAll"));
      dispatch(masterPropertyActions.reset("findAllByProductId"));
    };
  }, []);

  return (
    <PropertyAdd
      addResult={register}
      checkPassword={checkPassword}
      productList={productList}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
    />
  );
};

export default PropertyAddContainer;
