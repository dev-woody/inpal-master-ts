import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { useNavigate, useParams } from "react-router-dom";
import { masterAdminActions } from "reducers/admin/masterAdmin";
import { masterProductActions } from "reducers/product/masterProduct";
import { masterManufacturerActions } from "reducers/product/masterManufecturer";
import ManufacturerDetailPage from "components/code/manufacturer/manufacturerDetailPage";

const ManufacturerDetailPageContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { detailEditResult, checkPassword, manufacturerDetail, productId } =
    useAppSelector((state) => ({
      detailEditResult: state.masterManufacturer.detailPage,
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
    const userId = JSON.parse(localStorage.getItem("user") || "").signInfo
      .userId;
    dispatch(masterAdminActions.checkPass({ userId, password }));
  };

  const onSubmit = (data: any) => {
    setInputData(data);
    setIsSubmit(true);
    onCheckPassword(data.password);
  };

  useEffect(() => {
    if (checkPassword.success && isSubmit) {
      const data = manufacturerDetail.data;
      const { imageNumInfos } = inputData;
      dispatch(
        masterManufacturerActions.detailPage({
          id: data.base.id,
          detailPageInfo: { imageNumInfos: imageNumInfos },
        })
      );
      dispatch(masterAdminActions.reset("checkPass"));
      setIsSubmit(false);
    }
  }, [checkPassword]);

  useEffect(() => {
    if (detailEditResult.success) {
      dispatch(masterManufacturerActions.findById(id));
      setModalVisible(true);
      dispatch(masterManufacturerActions.reset("detailPage"));
    }
  }, [detailEditResult]);

  useEffect(() => {
    if (manufacturerDetail.success) {
      dispatch(
        masterProductActions.findById(manufacturerDetail.data?.info.productId)
      );
    }
  }, [manufacturerDetail]);

  useEffect(() => {
    dispatch(masterManufacturerActions.reset("detailPage"));
    dispatch(masterAdminActions.reset("checkPass"));
    dispatch(masterManufacturerActions.findById(id));
    return () => {
      dispatch(masterManufacturerActions.reset("detailPage"));
      dispatch(masterAdminActions.reset("checkPass"));
      dispatch(masterManufacturerActions.reset("findById"));
    };
  }, []);

  return (
    <ManufacturerDetailPage
      manufacturerDetail={manufacturerDetail}
      productId={productId}
      detailEditResult={detailEditResult.success}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
      id={id}
    />
  );
};

export default ManufacturerDetailPageContainer;
