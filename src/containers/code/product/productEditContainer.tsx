import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { useParams, useNavigate } from "react-router-dom";
import { masterProductActions } from "reducers/product/masterProduct";
import ProductEdit from "components/code/product/productEdit";
import { masterAdminActions } from "reducers/admin/masterAdmin";

const ProductEditContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { editResult, productDetail } = useAppSelector((state) => ({
    editResult: state.masterProduct.update.success,
    productDetail: state.masterProduct.findById,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (editResult) {
      dispatch(masterProductActions.findById(id));
      setModalVisible(true);
      dispatch(masterProductActions.reset("update"));
    }
  }, [editResult]);

  useEffect(() => {
    dispatch(masterProductActions.reset("update"));
    dispatch(masterAdminActions.reset("checkPass"));
    dispatch(masterProductActions.findById(id));
    return () => {
      dispatch(masterProductActions.reset("update"));
      dispatch(masterAdminActions.reset("checkPass"));
      dispatch(masterProductActions.reset("findById"));
    };
  }, []);

  return (
    <ProductEdit
      editResult={editResult}
      productDetail={productDetail}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigate={navigate}
    />
  );
};

export default ProductEditContainer;
