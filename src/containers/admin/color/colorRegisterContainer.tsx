import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import ColorAdd from "components/admin/color/colorAdd";
import { masterColorActions } from "reducers/admin/masterColor";
import { checkStatus } from "types/globalTypes";
import { useParams } from "react-router-dom";

const ColorRegisterContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { colorAddresult } = useAppSelector((state) => ({
    colorAddresult: state.masterColor.register,
  }));
  const dispatch = useAppDispatch();
  const { colorPageNum } = useParams();

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(
      masterColorActions.register({
        disCountRate: Number(data.disCountRate),
        expirationDays: Number(data.expirationDays),
        ...data,
      })
    );
  };

  useEffect(() => {
    if (checkStatus(colorAddresult.status)) {
      dispatch(masterColorActions.reset("register"));
      dispatch(
        masterColorActions.pageColor({
          isDesc: false,
          page: colorPageNum,
          size: 10,
        })
      );
      setModalVisible(true);
    }
  }, [colorAddresult]);

  useEffect(() => {
    return () => {
      dispatch(masterColorActions.reset("register"));
    };
  }, []);

  return (
    <ColorAdd
      colorAddresult={colorAddresult}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default ColorRegisterContainer;
