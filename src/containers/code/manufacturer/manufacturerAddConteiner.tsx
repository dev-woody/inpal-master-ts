import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterAdminActions } from "reducers/admin/masterAdmin";
import { masterProductActions } from "reducers/product/masterProduct";
import { masterManufacturerActions } from "reducers/product/masterManufecturer";
import ManufacturerAdd from "components/code/manufacturer/manufacturerAdd";
import { useNavigate } from "react-router-dom";
import { DataObj, checkStatus } from "types/globalTypes";

const ManufacturerAddContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { productList, register, checkPassword } = useAppSelector((state) => ({
    productList: state.masterProduct.findAll,
    checkPassword: state.masterAdmin.checkPass,
    register: state.masterManufacturer.register,
  }));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [inputData, setInputData] = useState<any>();

  const onCheckPassword = (password: string) => {
    const userId = JSON.parse(localStorage.getItem("masterUser") || "").signInfo
      .userId;
    dispatch(masterAdminActions.checkPass({ userId, password }));
  };

  const onSubmit = (data: any) => {
    setInputData(data);
    onCheckPassword(data.password);
  };

  useEffect(() => {
    if (checkStatus(checkPassword.status)) {
      const {
        logoImageInfo,
        country,
        nameEn,
        nameKr,
        productId,
        imageNumInfos,
      } = inputData;
      dispatch(
        masterManufacturerActions.register({
          productId,
          basicInfo: {
            logoImageInfo,
            isDomestic: country === "한국" ? true : false,
            country,
            nameEn,
            nameKr,
          },
          detailPageInfo: {
            imageNumInfos,
          },
        })
      );
      dispatch(masterAdminActions.reset("checkPass"));
    }
  }, [checkPassword]);

  useEffect(() => {
    if (checkStatus(register.status)) {
      dispatch(
        masterManufacturerActions.findAllByProductId({
          id: inputData?.productId,
        })
      );
      setModalVisible(true);
      dispatch(masterManufacturerActions.reset("register"));
    }
  }, [register]);

  useEffect(() => {
    dispatch(masterAdminActions.reset("checkPass"));
    dispatch(masterManufacturerActions.reset("register"));
    return () => {
      dispatch(masterAdminActions.reset("checkPass"));
      dispatch(masterManufacturerActions.reset("register"));
    };
  }, []);

  useEffect(() => {
    dispatch(masterProductActions.findAll(false));
    dispatch(masterManufacturerActions.reset("findAllByProductId"));
    return () => {
      dispatch(masterProductActions.reset("findAll"));
      dispatch(masterManufacturerActions.reset("findAllByProductId"));
    };
  }, []);

  return (
    <ManufacturerAdd
      addResult={register}
      checkPassword={checkPassword}
      productList={productList}
      onSubmit={onSubmit}
      resultMsg={register.message}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
    />
  );
};

export default ManufacturerAddContainer;
