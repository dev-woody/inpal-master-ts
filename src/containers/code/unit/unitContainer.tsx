import UnitList from "components/code/unit/unitList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import { masterProductActions } from "reducers/product/masterProduct";
import { masterUnitActions } from "reducers/product/masterUnit";
import { changeDays } from "lib/functions/changeInput";
import { ColumnsType } from "lib/columns/columnsList";
import { StyledToggle } from "lib/styles";

const UnitContainer = () => {
  const { productList, unitList } = useAppSelector((state) => ({
    productList: state.masterProduct.findAll,
    unitList: state.masterUnit.findAllByProductId,
  }));
  const [productId, setProductId] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSelect = (id: string) => {
    setProductId(id);
    dispatch(
      masterUnitActions.findAllByProductId({ productId: id, isDesc: false })
    );
  };

  useEffect(() => {
    dispatch(masterUnitActions.reset("findAllByProductId"));
    dispatch(masterProductActions.findAll(false));
    return () => {
      dispatch(masterUnitActions.reset("findAllByProductId"));
      dispatch(masterProductActions.reset("findAll"));
    };
  }, []);

  const unitColumns: ColumnsType[] = [
    {
      title: "번호",
      dataIndex: "",
      render: (_, __, index) => index,
    },
    {
      title: "단위",
      dataIndex: "info",
      render: (info) => info.nameEn,
    },
    {
      title: "단위(한)",
      dataIndex: "info",
      render: (info) => info.nameKr,
    },
    {
      title: "생성일",
      dataIndex: "base",
      isDesc: true,
      render: (base) => changeDays(base.createdAt),
    },
    {
      title: "수정일",
      dataIndex: "base",
      isDesc: true,
      render: (base) => changeDays(base.updatedAt),
    },
  ];

  return (
    <UnitList
      productList={productList.data}
      unitList={unitList}
      unitColumns={unitColumns}
      onSelect={onSelect}
      navigate={navigate}
    />
  );
};

export default UnitContainer;
