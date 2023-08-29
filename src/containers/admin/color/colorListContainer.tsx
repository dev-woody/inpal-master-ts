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
        isDesc: searchParams.get("isDesc"),
        page: searchParams.get("pageNum"),
        size: 10,
      })
    );
    return () => {
      dispatch(masterColorActions.reset("pageColor"));
    };
  }, [searchParams.get("n"), searchParams.get("d")]);

  useEffect(() => {
    navigate(`?n=0&d=false`);
  }, []);

  return <ColorList countColor={countColor} colorList={colorList} />;
};

export default ColorListContainer;
