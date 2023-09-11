import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { useNavigate, useParams } from "react-router-dom";
import { masterAdminActions } from "reducers/admin/masterAdmin";
import { masterProductActions } from "reducers/product/masterProduct";
import { masterManufacturerActions } from "reducers/product/masterManufecturer";
import ManufacturerBasicEdit from "components/code/manufacturer/manufacturerBasicEdit";
import { checkStatus } from "types/globalTypes";

const ManufacturerBasicEditContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { basicEditResult, checkPassword, manufacturerDetail, productId } =
    useAppSelector((state) => ({
      basicEditResult: state.masterManufacturer.basicInfo,
      manufacturerDetail: state.masterManufacturer.findById,
      checkPassword: state.masterAdmin.checkPass,
      productId: state.masterProduct.findById,
    }));
  const [inputData, setInputData] = useState<any>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const onCheckPassword = (password: string) => {
    const userId = JSON.parse(localStorage.getItem("masterUser") || "").signInfo
      .userId;
    dispatch(masterAdminActions.checkPass({ userId, password }));
  };

  const onSubmit = (data: any) => {
    setInputData(data);
    setIsSubmit(true);
    onCheckPassword(data.password);
  };

  useEffect(() => {
    if (checkStatus(checkPassword.status) && isSubmit) {
      const data = manufacturerDetail.data;
      const { logoImageInfo, nameKr, nameEn, country } = inputData;
      dispatch(
        masterManufacturerActions.basicInfo({
          id: data.base.id,
          basicInfo: {
            logoImageInfo: logoImageInfo,
            nameKr: nameKr,
            nameEn: nameEn,
            isDomestic: country === "한국" ? true : false,
            country: country,
          },
        })
      );
      dispatch(masterAdminActions.reset("checkPass"));
      setIsSubmit(false);
    }
  }, [checkPassword]);

  useEffect(() => {
    if (checkStatus(basicEditResult.status)) {
      dispatch(masterManufacturerActions.findById(id));
      setModalVisible(true);
      dispatch(masterManufacturerActions.reset("basicInfo"));
    }
  }, [basicEditResult]);

  useEffect(() => {
    if (checkStatus(manufacturerDetail.status)) {
      dispatch(
        masterProductActions.findById(manufacturerDetail.data?.info.productId)
      );
    }
  }, [manufacturerDetail]);

  useEffect(() => {
    dispatch(masterManufacturerActions.reset("basicInfo"));
    dispatch(masterAdminActions.reset("checkPass"));
    dispatch(masterManufacturerActions.findById(id));
    return () => {
      dispatch(masterManufacturerActions.reset("basicInfo"));
      dispatch(masterAdminActions.reset("checkPass"));
      dispatch(masterManufacturerActions.reset("findById"));
    };
  }, []);

  return (
    <ManufacturerBasicEdit
      manufacturerDetail={manufacturerDetail}
      checkPassword={checkPassword}
      productId={productId}
      basicEditResult={basicEditResult}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
      id={id}
    />
  );
};

export default ManufacturerBasicEditContainer;
