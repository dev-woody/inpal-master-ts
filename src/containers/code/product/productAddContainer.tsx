import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterAdminActions } from "reducers/admin/masterAdmin";
import { masterProductActions } from "reducers/product/masterProduct";
import { useNavigate } from "react-router-dom";
import ProductAdd from "components/code/product/productAdd";
import { DataObj } from "types/globalTypes";

const ProductAddContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { register, checkPassword } = useAppSelector((state) => ({
    register: state.masterProduct.register,
    checkPassword: state.masterAdmin.checkPass,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState<DataObj<string>>();
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
    if (checkPassword.status === "success") {
      dispatch(masterProductActions.register(inputData));
      dispatch(masterAdminActions.reset("checkPass"));
    }
  }, [checkPassword]);

  useEffect(() => {
    if (register?.status === "success") {
      dispatch(masterProductActions.findAll(false));
      setModalVisible(true);
      dispatch(masterProductActions.reset("register"));
    }
  }, [register]);

  useEffect(() => {
    dispatch(masterAdminActions.reset("checkPass"));
    dispatch(masterProductActions.reset("register"));
    return () => {
      dispatch(masterAdminActions.reset("checkPass"));
      dispatch(masterProductActions.reset("register"));
    };
  }, []);

  return (
    <ProductAdd
      addResult={register}
      checkPassword={checkPassword}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default ProductAddContainer;
