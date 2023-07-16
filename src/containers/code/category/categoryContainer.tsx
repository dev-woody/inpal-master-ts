import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterProductActions } from "reducers/product/masterProduct";
import CategoryList from "components/code/category/categoryList";
import { masterCategoryActions } from "reducers/product/masterCategory";

const CategoryContainer = () => {
  const { productList, categoryAllList, categoryEdit, categoryAdd } =
    useAppSelector((state) => ({
      productList: state.masterProduct.findAll,
      categoryAllList: state.masterCategory.findAllByProductId,
      categoryAdd: state.masterCategory.register,
      categoryEdit: state.masterCategory.update,
    }));
  const dispatch = useAppDispatch();
  const [isProductId, setIsProductId] = useState<string>("");

  const onSelectProduct = (id: string) => {
    setIsProductId(id);
    dispatch(
      masterCategoryActions.findAllByProductId({
        productId: id,
        isDesc: false,
      })
    );
  };

  const onSelectCategory = (id: string) => {
    dispatch(masterCategoryActions.findById(id));
  };

  useEffect(() => {
    if (categoryEdit.success || categoryAdd.success) {
      dispatch(masterCategoryActions.reset("register"));
      dispatch(masterCategoryActions.reset("update"));
      dispatch(
        masterCategoryActions.findAllByProductId({
          productId: isProductId,
          isDesc: false,
        })
      );
    }
  }, [categoryEdit, categoryAdd]);

  useEffect(() => {
    dispatch(masterCategoryActions.reset("findAllByOwnerId"));
    dispatch(masterProductActions.findAll(false));
    dispatch(masterCategoryActions.reset("findAllByProductId"));
    return () => {
      dispatch(masterCategoryActions.reset("findAllByOwnerId"));
      dispatch(masterProductActions.reset("findAll"));
      dispatch(masterCategoryActions.reset("findAllByProductId"));
    };
  }, []);
  return (
    <CategoryList
      productList={productList.data}
      categoryAllList={categoryAllList.data}
      categoryAdd={categoryAdd}
      isProductId={isProductId}
      onSelectProduct={onSelectProduct}
      onSelectCategory={onSelectCategory}
    />
  );
};

export default CategoryContainer;
