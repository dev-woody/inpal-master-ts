import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterProductActions } from "reducers/product/masterProduct";
import { masterAdminActions } from "reducers/admin/masterAdmin";
import { masterCategoryActions } from "reducers/product/masterCategory";
import CategoryAdd from "components/code/category/categoryAdd";
import { DataObj, checkStatus } from "types/globalTypes";

const CategoryAddContainer = ({
  higherLevel,
  kind,
  isCategoryAdd,
}: {
  higherLevel: string;
  kind?: string;
  isCategoryAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { checkPassword, categoryRegister } = useAppSelector((state) => ({
    checkPassword: state.masterAdmin.checkPass,
    categoryRegister: state.masterCategory.register,
  }));
  const dispatch = useAppDispatch();
  const [inputData, setInputData] = useState<any>();

  const onCheckPassword = ({ password }: any) => {
    const userId = JSON.parse(localStorage.getItem("user") || "").signInfo
      .userId;
    dispatch(masterAdminActions.checkPass({ userId, password }));
  };

  const onSubmit = (data: DataObj<string>) => {
    setInputData(data);
    onCheckPassword({ password: data.password });
  };

  useEffect(() => {
    if (checkStatus(checkPassword.status) && inputData) {
      dispatch(
        masterCategoryActions.register({
          kind,
          ownerId: higherLevel,
          description: inputData.name,
        })
      );
      dispatch(masterAdminActions.reset("checkPass"));
    }
  }, [checkPassword]);

  useEffect(() => {
    if (checkStatus(categoryRegister.status)) {
      setModalVisible(true);
    }
  }, [categoryRegister]);

  useEffect(() => {
    dispatch(masterAdminActions.reset("checkPass"));
    dispatch(masterProductActions.findAll(false));
    return () => {
      dispatch(masterAdminActions.reset("checkPass"));
    };
  }, []);

  return (
    <CategoryAdd
      categoryRegister={categoryRegister}
      checkPassword={checkPassword}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      isCategoryAdd={isCategoryAdd}
    />
  );
};

export default CategoryAddContainer;
