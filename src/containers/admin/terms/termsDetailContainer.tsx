import TermsEdit from "components/admin/terms/termsEdit";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { masterTermsActions } from "reducers/admin/masterTerms";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const TermsDetailContainer = () => {
  const { editResult, termsDetail } = useAppSelector((state) => ({
    editResult: state.masterTerms.update,
    termsDetail: state.masterTerms.findById,
  }));
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { id } = useParams();

  const onSubmit = <T,>(data: T) => {
    dispatch(
      masterTermsActions.update({
        ...data,
        id,
      })
    );
  };

  useEffect(() => {
    if (checkStatus(editResult.status)) {
      setModalVisible(true);
      dispatch(masterTermsActions.reset("register"));
    }
  }, [editResult]);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(masterTermsActions.findById(id));
    }
    return () => {
      dispatch(masterTermsActions.reset("findById"));
    };
  }, []);

  return (
    <TermsEdit
      editResult={editResult}
      termsDetail={termsDetail}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default TermsDetailContainer;
