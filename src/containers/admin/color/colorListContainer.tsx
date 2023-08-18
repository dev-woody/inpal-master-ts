import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import ColorList from "components/admin/color/colorList";
import { masterColorActions } from "reducers/admin/masterColor";
import { useParams } from "react-router-dom";

const ColorListContainer = () => {
  const { countColor, colorList } = useAppSelector((store) => ({
    countColor: store.masterColor.countColor,
    colorList: store.masterColor.pageColor,
  }));
  const dispatch = useAppDispatch();
  const { colorPageNum } = useParams();

  useEffect(() => {
    dispatch(masterColorActions.countColor({}));
  }, []);

  useEffect(() => {
    dispatch(
      masterColorActions.pageColor({
        isDesc: false,
        page: colorPageNum,
        size: 10,
      })
    );
    return () => {
      dispatch(masterColorActions.reset("pageColor"));
    };
  }, [colorPageNum]);

  return (
    <ColorList
      countColor={countColor}
      colorList={colorList}
      colorPageNum={colorPageNum}
    />
  );
};

export default ColorListContainer;
