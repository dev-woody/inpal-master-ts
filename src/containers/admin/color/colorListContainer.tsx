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
        pageNum: searchParams.get("pageNum"),
        isDesc: searchParams.get("isDesc"),
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
  }, [searchParams.get("pageNum"), searchParams.get("isDesc")]);

  useEffect(() => {
    navigate(`?pageNum=0&isDesc=false`);
  }, []);

  return <ColorList countColor={countColor} colorList={colorList} />;
};

export default ColorListContainer;
