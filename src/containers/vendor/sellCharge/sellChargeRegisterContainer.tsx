import SellChargeAdd from "components/vendor/sellCharge/sellChargeAdd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { masterProductActions } from "reducers/product/masterProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterVendorActions } from "reducers/vendor/masterVendor";
import { sellChargeRegisterActions } from "reducers/vendor/sellCharge/register";
import { checkStatus } from "types/globalTypes";

const SellChargeRegisterContainer = () => {
  const { user, productList, registerResult } = useAppSelector((state) => ({
    user: state.user,
    productList: state.masterProduct.findAll,
    registerResult: state.masterVendor.pnRegister,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = ({ data }: { data: any }) => {
    dispatch(masterVendorActions.pnRegister({ vendorId: id, ...data }));
  };

  useEffect(() => {
    if (checkStatus(registerResult.status)) {
      setModalVisible(true);
      dispatch(masterVendorActions.reset("pnRegister"));
    }
  }, [registerResult]);

  useEffect(() => {
    dispatch(masterProductActions.findAll(false));
    return () => {
      // dispatch(masterProductActions.reset({}));
      dispatch(masterVendorActions.reset("pnRegister"));
    };
  }, []);

  return (
    <SellChargeAdd
      productList={productList}
      registerResult={registerResult}
      onSubmit={onSubmit}
      navigate={navigate}
      vendorId={id}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default SellChargeRegisterContainer;
