import UnitAdd from "components/code/unit/unitAdd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterAdminActions } from "reducers/admin/masterAdmin";
import { masterProductActions } from "reducers/product/masterProduct";
import { masterUnitActions } from "reducers/product/masterUnit";
import { DataObj, checkStatus } from "types/globalTypes";

const UnitRegisterContainer = () => {
  const { productList, checkPassword, register } = useAppSelector((state) => ({
    productList: state.masterProduct.findAll,
    checkPassword: state.masterAdmin.checkPass,
    register: state.masterUnit.register,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
      dispatch(masterUnitActions.register(inputData));
      // dispatch(masterAdminActions.reset({}));
    }
  }, [checkPassword]);

  useEffect(() => {
    if (checkStatus(register.status)) {
      dispatch(
        masterUnitActions.findAllByProductId({
          id: inputData?.id,
          isDesc: false,
        })
      );
      setModalVisible(true);
      dispatch(masterUnitActions.reset("register"));
    }
  }, [register]);

  useEffect(() => {
    dispatch(masterProductActions.findAll(false));
    return () => {
      // dispatch(masterProductActions.reset({}));
      // dispatch(masterAdminActions.reset({}));
    };
  }, []);

  return (
    <UnitAdd
      registerResult={register}
      productList={productList}
      checkPassword={checkPassword}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
    />
  );
};

export default UnitRegisterContainer;
