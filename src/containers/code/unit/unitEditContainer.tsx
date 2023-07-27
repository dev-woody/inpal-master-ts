import UnitEdit from "components/code/unit/unitEdit";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterAdminActions } from "reducers/admin/masterAdmin";
import { masterProductActions } from "reducers/product/masterProduct";
import { masterUnitActions } from "reducers/product/masterUnit";
import { DataObj, checkStatus } from "types/globalTypes";

const UnitEditContainer = () => {
  const { editResult, checkPassword, unitDetail, productId } = useAppSelector(
    (state) => ({
      editResult: state.masterUnit.update,
      checkPassword: state.masterAdmin.checkPass,
      unitDetail: state.masterUnit.findById,
      productId: state.masterProduct.findById,
    })
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [inputData, setInputData] = useState<DataObj<string>>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

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
      const data: any = unitDetail.data;
      dispatch(
        masterUnitActions.update({
          id: data.base.id,
          ...inputData,
        })
      );
      dispatch(masterAdminActions.reset("checkPass"));
    }
  }, [checkPassword]);

  useEffect(() => {
    if (checkStatus(editResult.status)) {
      setModalVisible(true);
      dispatch(masterUnitActions.reset("update"));
      dispatch(
        masterUnitActions.findAllByProductId(unitDetail.data.info.productId)
      );
    }
  }, [editResult]);

  useEffect(() => {
    if (checkStatus(unitDetail.status)) {
      dispatch(masterProductActions.findById(unitDetail.data?.info.productId));
    }
  }, [unitDetail]);

  useEffect(() => {
    dispatch(masterUnitActions.findById(id));
    return () => {
      dispatch(masterUnitActions.reset("update"));
      dispatch(masterAdminActions.reset("checkPass"));
    };
  }, []);

  return (
    <UnitEdit
      unitDetail={unitDetail}
      productId={productId}
      checkPassword={checkPassword}
      editResult={editResult}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
      id={id}
    />
  );
};

export default UnitEditContainer;
