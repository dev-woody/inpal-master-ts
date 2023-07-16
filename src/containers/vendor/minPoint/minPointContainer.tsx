import MinPointList from "components/vendor/minPoint/minPointList";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { minPointFindByVIdActions } from "reducers/vendor/minPoint/findByVId";

const MinPointContainer = () => {
  const { minPointList } = useAppSelector((state) => ({
    minPointList: state.minPointFindByVId,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { vendorId } = useParams();

  useEffect(() => {
    dispatch(
      minPointFindByVIdActions.getFindByVId({
        data: { vendorId: vendorId, isDesc: false },
      })
    );
    return () => {
      dispatch(minPointFindByVIdActions.reset({}));
    };
  }, []);

  return (
    <MinPointList
      minPointList={minPointList}
      navigate={navigate}
      vendorId={vendorId}
    />
  );
};

export default MinPointContainer;
