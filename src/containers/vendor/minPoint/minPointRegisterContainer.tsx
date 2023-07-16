import MinPointAdd from "components/vendor/minPoint/minPointAdd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { masterProductActions } from "reducers/product/masterProduct";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { minPointRegisterActions } from "reducers/vendor/minPoint/register";

const MinPointRegisterContainer = () => {
  const { user, productList, registerResult } = useAppSelector((state) => ({
    user: state.user,
    productList: state.masterProduct.findAll,
    registerResult: state.minPointRegister.success,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { vendorId } = useParams();

  const onSubmit = ({ data }: { data: any }) => {
    dispatch(
      minPointRegisterActions.postRegister({
        data: {
          vendorId: vendorId,
          masterUserId: user.signInfo.userId,
          pointRatio: Number(data?.pointRatio),
          ...data,
        },
      })
    );
  };

  useEffect(() => {
    if (registerResult) {
      setModalVisible(true);
      dispatch(minPointRegisterActions.reset({}));
    }
  }, [registerResult]);

  useEffect(() => {
    dispatch(masterProductActions.findAll(false));
    return () => {
      // dispatch(masterProductActions.reset({}));
      // dispatch(minPointRegisterActions.reset({}));
    };
  }, []);

  return (
    <MinPointAdd
      productList={productList}
      onSubmit={onSubmit}
      navigate={navigate}
      vendorId={vendorId}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default MinPointRegisterContainer;
