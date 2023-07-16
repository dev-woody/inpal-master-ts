import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterAdminActions } from "reducers/admin/masterAdmin";
import { masterCategoryActions } from "reducers/product/masterCategory";
import CategoryEdit from "components/code/category/categoryEdit";
import { DataObj } from "types/globalTypes";

const CategoryEditContainer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { categoryFindById, categoryUpdate, checkPassword } = useAppSelector(
    (state) => ({
      categoryFindById: state.masterCategory.findById,
      categoryUpdate: state.masterCategory.update,
      checkPassword: state.masterAdmin.checkPass.success,
    })
  );
  const [inputData, setInputData] = useState<any>();
  const dispatch = useAppDispatch();

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
    if (checkPassword && inputData !== undefined) {
      dispatch(
        masterCategoryActions.update({
          id: categoryFindById.data.info.id,
          description: inputData.description,
        })
      );
      dispatch(masterAdminActions.reset("checkPass"));
    }
  }, [checkPassword]);

  useEffect(() => {
    if (categoryUpdate.success) {
      // navigate(`/code/category`);
      dispatch(
        masterCategoryActions.findAllByOwnerId({
          ownerId: categoryFindById?.data.info.productId,
          isDesc: false,
        })
      );
      dispatch(masterCategoryActions.findById(categoryFindById?.data.info.id));
      dispatch(masterCategoryActions.reset("update"));
      setModalVisible(true);
    }
  }, [categoryUpdate]);

  useEffect(() => {}, [categoryUpdate]);

  useEffect(() => {
    dispatch(masterCategoryActions.reset("findById"));
    dispatch(masterCategoryActions.reset("update"));
    dispatch(masterAdminActions.reset("checkPass"));
    return () => {
      dispatch(masterCategoryActions.reset("findById"));
      dispatch(masterCategoryActions.reset("update"));
      dispatch(masterAdminActions.reset("checkPass"));
    };
  }, []);

  return (
    <CategoryEdit
      categoryFindById={categoryFindById.data}
      categoryUpdate={categoryUpdate}
      onSubmit={onSubmit}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    />
  );
};

export default CategoryEditContainer;
