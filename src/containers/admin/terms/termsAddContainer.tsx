import TermsAdd from "components/admin/terms/termsAdd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { masterTermsActions } from "reducers/admin/masterTerms";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { checkStatus } from "types/globalTypes";

const TermsAddContainer = () => {
  const { addResult } = useAppSelector((state) => ({
    addResult: state.masterTerms.register,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = <T,>(data: T) => {
    dispatch(masterTermsActions.register({ ...data }));
  };

  useEffect(() => {
    if (checkStatus(addResult.status)) {
      setModalVisible(true);
      dispatch(masterTermsActions.reset("register"));
    }
  }, [addResult]);

  return (
    <TermsAdd
      addResult={addResult}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default TermsAddContainer;
