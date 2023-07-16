import MinPointEdit from "components/vendor/minPoint/minPointEdit";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { minPointFindByIdActions } from "reducers/vendor/minPoint/findById";
import { minPointUpdateActions } from "reducers/vendor/minPoint/update";

const MinPointEditContainer = () => {
  const { user, minPointDetail, updateResult } = useAppSelector((state) => ({
    user: state.user,
    minPointDetail: state.minPointFindById,
    updateResult: state.minPointUpdate.success,
  }));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { vendorId, id } = useParams();

  const onSubmit = ({ data }: { data: object }) => {
    dispatch(
      minPointUpdateActions.postUpdate({
        data: {
          id,
          vendorId,
          masterUserId: user.signInfo.userId,
          //! ProductId 필요함
          productId: minPointDetail.data.productId,
          pointRatio: Number(minPointDetail.data.pointRatio),
          ...data,
        },
      })
    );
  };

  useEffect(() => {
    if (updateResult) {
      setModalVisible(true);
      dispatch(minPointUpdateActions.reset({}));
    }
  }, [dispatch, updateResult]);

  useEffect(() => {
    dispatch(minPointFindByIdActions.getFindById({ data: { vendorId, id } }));
    return () => {
      dispatch(minPointFindByIdActions.reset({}));
      dispatch(minPointUpdateActions.reset({}));
    };
  }, []);

  return (
    <MinPointEdit
      minPointDetail={minPointDetail}
      onSubmit={onSubmit}
      navigate={navigate}
      vendorId={vendorId}
      id={id}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default MinPointEditContainer;
