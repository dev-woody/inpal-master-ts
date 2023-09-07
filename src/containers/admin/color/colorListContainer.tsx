import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "reducers/reducerHooks";
import ColorList from "components/admin/color/colorList";
import { masterColorActions } from "reducers/admin/masterColor";
import { useNavigate, useSearchParams } from "react-router-dom";

const ColorListContainer = () => {
  const { countColor, colorList } = useAppSelector((store) => ({
    countColor: store.masterColor.countColor,
    colorList: store.masterColor.pageColor,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(masterColorActions.countColor({}));
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      "colorPageInfo",
      JSON.stringify({
        n: searchParams.get("n"),
        d: searchParams.get("d"),
      })
    );
    dispatch(
      masterColorActions.pageColor({
        isDesc:  atob(searchParams.get("d") || btoa("false")),
        page: atob(searchParams.get("n") || btoa("0")),
        size: 10,
      })
    );
    return () => {
      dispatch(masterColorActions.reset("pageColor"));
    };
  }, [searchParams.get("n"), searchParams.get("d")]);


  useEffect(() => {
    if ((searchParams.get("n") || searchParams.get("d")) === null) {
      navigate(`?n=${btoa("0")}&d=${btoa("false")}`);
    }
  }, [searchParams.get("n"), searchParams.get("d")]);

  return <ColorList countColor={countColor} colorList={colorList} />;
};

export default ColorListContainer;
