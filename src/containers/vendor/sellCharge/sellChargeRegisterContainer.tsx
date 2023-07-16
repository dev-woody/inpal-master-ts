import SellChargeAdd from "components/vendor/sellCharge/sellChargeAdd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { masterProductActions } from "reducers/product/masterProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { sellChargeRegisterActions } from "reducers/vendor/sellCharge/register";

const SellChargeRegisterContainer = () => {
  const { user, productList, registerResult } = useAppSelector((state) => ({
    user: state.user,
    productList: state.masterProduct.findAll,
    registerResult: state.sellChargeRegister.success,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { vendorId } = useParams();

  const onSubmit = ({ data }: { data: any }) => {
    dispatch(
      sellChargeRegisterActions.postRegister({
        data: {
          vendorId: vendorId,
          masterUserId: user.signInfo.userId,
          chargeRatio: Number(data?.chargeRatio),
          ...data,
        },
      })
    );
  };

  useEffect(() => {
    if (registerResult) {
      setModalVisible(true);
      dispatch(sellChargeRegisterActions.reset({}));
    }
  }, [registerResult]);

  useEffect(() => {
    dispatch(masterProductActions.findAll(false));
    return () => {
      // dispatch(masterProductActions.reset({}));
      // dispatch(sellChargeRegisterActions.reset({}));
    };
  }, []);

  return (
    <SellChargeAdd
      productList={productList}
      onSubmit={onSubmit}
      navigate={navigate}
      vendorId={vendorId}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default SellChargeRegisterContainer;
