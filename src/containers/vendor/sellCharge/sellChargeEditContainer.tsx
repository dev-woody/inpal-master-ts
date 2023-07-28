import SellChargeEdit from "components/vendor/sellCharge/sellChargeEdit";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterVendorActions } from "reducers/vendor/masterVendor";
import { sellChargeFindByIdActions } from "reducers/vendor/sellCharge/findById";
import { sellChargeUpdateActions } from "reducers/vendor/sellCharge/update";

const SellChargeEditContainer = () => {
  const { user, sellChargeDetail, updateResult } = useAppSelector((state) => ({
    user: state.user,
    sellChargeDetail: state.sellChargeFindById,
    updateResult: state.sellChargeUpdate.success,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { vendorId, id } = useParams();

  const onSubmit = (data: object) => {
    dispatch(
      masterVendorActions.pnUpdate({
        id,
        vendorId,
        ...data,
      })
    );
  };

  useEffect(() => {
    if (updateResult) {
      setModalVisible(true);
      dispatch(sellChargeUpdateActions.reset({}));
    }
  }, [dispatch, updateResult]);

  useEffect(() => {
    dispatch(sellChargeFindByIdActions.getFindById({ data: { vendorId, id } }));
    return () => {
      dispatch(sellChargeFindByIdActions.reset({}));
      dispatch(sellChargeUpdateActions.reset({}));
    };
  }, []);

  return (
    <SellChargeEdit
      sellChargeDetail={sellChargeDetail}
      onSubmit={onSubmit}
      navigate={navigate}
      vendorId={vendorId}
      id={id}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default SellChargeEditContainer;
