import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import ColorList from "components/admin/color/colorList";
import { masterColorActions } from "reducers/admin/masterColor";

const ColorListContainer = () => {
  const { colorList } = useAppSelector((state) => ({
    colorList: state.masterColor.findAll,
    colorResult: state.masterColor.register.success,
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(masterColorActions.findAll(false));
    return () => {
      dispatch(masterColorActions.reset("findAll"));
    };
  }, []);

  return <ColorList colorList={colorList} />;
};

export default ColorListContainer;
