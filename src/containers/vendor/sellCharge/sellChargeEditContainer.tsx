import SellChargeEdit from "components/vendor/sellCharge/sellChargeEdit";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterVendorActions } from "reducers/vendor/masterVendor";
import { checkStatus } from "types/globalTypes";

const SellChargeEditContainer = () => {
  const { user, sellChargeDetail, updateResult } = useAppSelector((state) => ({
    user: state.user,
    sellChargeDetail: state.masterVendor.pnFindById,
    updateResult: state.masterVendor.pnUpdate,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, sellId } = useParams();

  const onSubmit = (data: object) => {
    dispatch(
      masterVendorActions.pnUpdate({
        id: sellId,
        vendorId: id,
        ...data,
      })
    );
  };

  useEffect(() => {
    if (checkStatus(updateResult.status)) {
      setModalVisible(true);
      dispatch(masterVendorActions.reset("pnUpdate"));
    }
  }, [dispatch, updateResult]);

  useEffect(() => {
    dispatch(masterVendorActions.pnFindById({ vendorId: id, id: sellId }));
    return () => {
      dispatch(masterVendorActions.reset("pnFindById"));
      dispatch(masterVendorActions.reset("pnUpdate"));
    };
  }, []);

  return (
    <SellChargeEdit
      sellChargeDetail={sellChargeDetail}
      updateResult={updateResult}
      onSubmit={onSubmit}
      navigate={navigate}
      vendorId={id}
      id={sellId}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default SellChargeEditContainer;
