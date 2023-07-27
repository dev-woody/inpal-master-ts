import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import ColorEdit from "components/admin/color/colorEdit";
import { masterColorActions } from "reducers/admin/masterColor";
import { checkStatus } from "types/globalTypes";

const ColorEditContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { colorFindByName, colorUpdateResult } = useAppSelector((state) => ({
    colorFindByName: state.masterColor.findByName,
    colorUpdateResult: state.masterColor.update,
  }));
  const dispatch = useAppDispatch();
  const location = useLocation();

  const splitUrl = location.pathname.split("/");

  const onSubmit = <T,>(data: T) => {
    dispatch(
      masterColorActions.update({
        id: colorFindByName.data.base.id,
        ...data,
      })
    );
  };

  useEffect(() => {
    dispatch(masterColorActions.reset("findByName"));
    if (splitUrl[splitUrl.length - 1] !== "color") {
      dispatch(masterColorActions.findByName(splitUrl[splitUrl.length - 1]));
    }
  }, [location]);

  useEffect(() => {
    if (checkStatus(colorUpdateResult.status)) {
      dispatch(masterColorActions.reset("update"));
      dispatch(masterColorActions.findAll(false));
      setModalVisible(true);
    }
  }, [colorUpdateResult]);

  useEffect(() => {
    return () => {
      dispatch(masterColorActions.reset("update"));
      dispatch(masterColorActions.reset("findByName"));
    };
  }, []);

  return (
    <ColorEdit
      editResult={colorUpdateResult}
      colorFindByName={colorFindByName}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default ColorEditContainer;
