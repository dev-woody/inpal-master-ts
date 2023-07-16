import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import PageHeader from "lib/pages/pageHeader";
import { Button, Responsive, StyledInput } from "lib/styles";
import { StyledSelect } from "lib/styles/selectStyle";
import CategoryEditContainer from "containers/code/category/categoryEditContainer";
import CategoryAddContainer from "containers/code/category/categoryAddContainer";
import { response } from "types/globalTypes";

type categoryListProps = {
  productList: any;
  categoryAllList: any;
  categoryAdd: any;
  isProductId: string;
  onSelectProduct: (id: string) => void;
  onSelectCategory: (id: string) => void;
};

const CategoryListBlock = styled(Responsive)`
  z-index: 99;
`;

const CategoryBoxBlock = styled.div`
  border: 1px solid #e9e9e9;
  width: 300px;
  border-radius: 0.75rem;
  box-sizing: border-box;
  height: 300px;
  overflow-y: scroll;
  padding: 0.75rem;
`;

const DepthCategory = styled.div`
  padding-left: 1rem;
  margin: 0.5rem 0;
`;

const CategoryMarginTop = styled.div`
  & + & {
    margin-top: 0.725rem;
  }
`;

const CategoryBlock = styled.div`
  border: 1px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 0.75rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 0.725rem;
  }

  &:hover {
    border: 1px solid #f2bd21;
    box-shadow: 0 0 0 2px rgb(250 173 20 / 10%);
    cursor: pointer;
  }

  & > button {
    display: none;
  }

  &.selected > button {
    display: block;
    /* border: 1px solid #f2bd21;
    box-shadow: 0 0 0 2px rgb(250 173 20 / 10%); */
  }

  & + .childrenBox {
    display: none;
  }

  &.selected + .childrenBox {
    display: block;
  }
`;

const DevideLine = styled.div`
  width: 1px;
  border: 0.5px solid #efefef;
  box-sizing: border-box;
  align-self: stretch;
  margin: 0 1rem;
`;

const CategoryList = ({
  productList,
  categoryAllList,
  categoryAdd,
  isProductId,
  onSelectProduct,
  onSelectCategory,
}: categoryListProps) => {
  const [check1st, setCheck1st] = useState("");
  const [check2nd, setCheck2nd] = useState("");
  const [check3rd, setCheck3rd] = useState("");

  const [is1stAdd, setIs1stAdd] = useState<boolean>(false);
  const [is2ndAdd, setIs2ndAdd] = useState<boolean>(false);
  const [is3rdAdd, setIs3rdAdd] = useState<boolean>(false);

  const category1sts = categoryAllList?.category1sts;

  function removeActiveClass() {
    const selectedList = document.querySelectorAll(".selected");
    setIs1stAdd(false);
    setCheck1st("");
    setCheck2nd("");
    setCheck3rd("");
    for (let i = 0; i < selectedList.length; i++) {
      selectedList[i].classList.remove("selected");
    }
  }

  return (
    <CategoryListBlock>
      <div style={{ display: "flex", alignItems: "start" }}>
        <div>
          <PageHeader title="카테고리 조회" />
          <StyledSelect
            placeholder="품목 선택"
            optionList={productList}
            actions={(id: string) => {
              onSelectProduct(id);
              removeActiveClass();
            }}
            fullWidth
            nonError
          />
          <Button
            // disable={category1sts && category1sts.length < 3 ? false : true}
            status="primary"
            fullWidth={true}
            style={{ margin: "0.5rem 0" }}
            onClick={() => {
              if (category1sts) {
                setIs1stAdd(!is1stAdd);
              }
            }}
          >
            {is1stAdd ? "삭제" : "추가"}
          </Button>
          <CategoryBoxBlock>
            {category1sts ? (
              <>
                {category1sts.map((list: any, index: string) => {
                  return (
                    <CategoryMarginTop key={index}>
                      <CategoryBlock
                        className={index === check1st ? "selected" : undefined}
                        id={index}
                        onClick={(e) => {
                          setCheck2nd("");
                          setCheck3rd("");
                          setIs2ndAdd(false);
                          setIs3rdAdd(false);
                          setCheck1st(index);
                          onSelectCategory(list.category1st.id);
                        }}
                        style={
                          index === check1st
                            ? {
                                border: "1px solid #f2bd21",
                                boxShadow: "0 0 0 2px rgb(250 173 20 / 10%)",
                              }
                            : undefined
                        }
                      >
                        {list.category1st.description}
                        <Button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIs2ndAdd(!is2ndAdd);
                          }}
                        >
                          {is2ndAdd ? "-" : "+"}
                        </Button>
                      </CategoryBlock>
                      <DepthCategory className="childrenBox">
                        {list.category2nds.map(
                          (list2nd: any, index: string) => {
                            return (
                              <CategoryMarginTop key={index}>
                                <CategoryBlock
                                  id={index}
                                  className={
                                    index === check2nd ? "selected" : undefined
                                  }
                                  onClick={(e) => {
                                    setCheck3rd("");
                                    setIs3rdAdd(false);
                                    setCheck2nd(index);
                                    onSelectCategory(list2nd.category2nd.id);
                                  }}
                                  style={
                                    index === check2nd
                                      ? {
                                          border: "1px solid #f2bd21",
                                          boxShadow:
                                            "0 0 0 2px rgb(250 173 20 / 10%)",
                                        }
                                      : undefined
                                  }
                                >
                                  {list2nd.category2nd.description}
                                  <Button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setIs3rdAdd(!is3rdAdd);
                                    }}
                                  >
                                    {is3rdAdd ? "-" : "+"}
                                  </Button>
                                </CategoryBlock>
                                <DepthCategory className="childrenBox">
                                  {list2nd.category3rds.map(
                                    (list3rd: any, index: string) => {
                                      return (
                                        <CategoryBlock
                                          key={index}
                                          className={
                                            index === check3rd
                                              ? "selected"
                                              : undefined
                                          }
                                          onClick={(e) => {
                                            setCheck3rd(index);
                                            onSelectCategory(
                                              list3rd.category3rd.id
                                            );
                                          }}
                                          style={
                                            index === check3rd
                                              ? {
                                                  border: "1px solid #f2bd21",
                                                  boxShadow:
                                                    "0 0 0 2px rgb(250 173 20 / 10%)",
                                                }
                                              : undefined
                                          }
                                        >
                                          {list3rd.category3rd.description}
                                        </CategoryBlock>
                                      );
                                    }
                                  )}
                                  {is3rdAdd && (
                                    <CategoryAddContainer
                                      higherLevel={list2nd.category2nd.id}
                                      kind="third"
                                      isCategoryAdd={setIs3rdAdd}
                                    />
                                  )}
                                </DepthCategory>
                              </CategoryMarginTop>
                            );
                          }
                        )}
                        {is2ndAdd && (
                          <CategoryAddContainer
                            higherLevel={list.category1st.id}
                            kind="second"
                            isCategoryAdd={setIs2ndAdd}
                          />
                        )}
                      </DepthCategory>
                    </CategoryMarginTop>
                  );
                })}
                {is1stAdd && (
                  <CategoryAddContainer
                    higherLevel={isProductId}
                    kind="first"
                    isCategoryAdd={setIs1stAdd}
                  />
                )}
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "0.875rem" }}>품목을 선택해주세요.</p>
              </div>
            )}
          </CategoryBoxBlock>
        </div>
        <DevideLine />
        <CategoryEditContainer />
      </div>
    </CategoryListBlock>
  );
};

export default CategoryList;
