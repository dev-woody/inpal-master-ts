import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterVendorActions } from "reducers/vendor/masterVendor";
import VendorDetail from "components/vendor/list/vendorDetail";
import { checkStatus } from "types/globalTypes";

const VendorDetailContainer = () => {
  const { vendorFindById, setVendorStatus, vendorRegister } = useAppSelector(
    (state) => ({
      vendorFindById: state.masterVendor.findById,
      vendorRegister: state.masterVendor.approve,
      setVendorStatus: state.masterVendor.setBizStatus,
    })
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const onRegister = () => {
    dispatch(masterVendorActions.approve(id));
  };

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(
      masterVendorActions.setBizStatus({
        status: data.vendorStatus,
        vendorId: id,
      })
    );
  };

  useEffect(() => {
    if (
      checkStatus(vendorRegister.status) ||
      checkStatus(setVendorStatus.status)
    ) {
      dispatch(masterVendorActions.findById(id));
      dispatch(masterVendorActions.reset("approve"));
      dispatch(masterVendorActions.reset("setBizStatus"));

      setModalVisible(true);
    }
  }, [vendorRegister, setVendorStatus]);

  useEffect(() => {
    dispatch(masterVendorActions.findById(id));
    return () => {
      dispatch(masterVendorActions.reset("findById"));
      dispatch(masterVendorActions.reset("approve"));
      dispatch(masterVendorActions.reset("setBizStatus"));
    };
  }, []);

  return (
    <VendorDetail
      vendor={vendorFindById.data}
      setBizStatus={setVendorStatus}
      onSubmit={onSubmit}
      onRegister={onRegister}
      navigate={navigate}
      id={id}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default VendorDetailContainer;
