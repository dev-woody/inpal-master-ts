import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { useParams } from "react-router-dom";
import PropertyDetail from "components/code/property/propertyDetail";
import { masterPropertyActions } from "reducers/product/masterProperty";

const PropertyDetailContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { propertyEdit, propertyDetail } = useAppSelector((state) => ({
    propertyEdit: state.masterProperty.update,
    propertyDetail: state.masterProperty.findById,
  }));
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const onSubmit = (data: object) => {
    dispatch(masterPropertyActions.update({ id, ...data }));
  };

  useEffect(() => {
    if (propertyEdit.success) {
      setModalVisible(true);
    }
  }, [propertyEdit]);

  useEffect(() => {
    dispatch(masterPropertyActions.findById(id));
    return () => {
      dispatch(masterPropertyActions.reset("findAllByProductId"));
      dispatch(masterPropertyActions.reset("update"));
    };
  }, []);

  return (
    <PropertyDetail
      propertyDetail={propertyDetail}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default PropertyDetailContainer;
