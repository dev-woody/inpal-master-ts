import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import styled from "styled-components";

type checkboxProps = {
  category: any;
  newCategory?: { [key: string]: any }[];
  setNewCategory: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: any;
      }[]
    >
  >;
};

type categoryProps = {
  newCategory?: { [ket: string]: any }[];
  setNewCategory: React.Dispatch<
    React.SetStateAction<
      {
        [key: string]: any;
      }[]
    >
  >;
};

const CheckboxCategoryBlock = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 0.75rem;
  padding: 0.75rem;
`;

const CheckboxBlock = styled.div`
  padding: 0.5rem 0;
  min-width: 200px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const CheckboxText = styled.div`
  margin-left: 0.5rem;
  font-size: 0.75rem;
`;

const Title = styled.div`
  width: 200px;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const LineFlex = styled.div`
  display: flex;
`;

const ColFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledCheckBox = ({
  category,
  newCategory,
  setNewCategory,
}: checkboxProps) => {
  const onClick = () => {
    category.checked = !category.checked;
    if (category.category2nd && !category.checked) {
      category.category2nd.map((list2nd: any) => {
        list2nd.checked = false;
        list2nd.category3rd?.map((list3rd: any) => {
          list3rd.checked = false;
        });
      });
    } else if (category.category3rd && !category.checked) {
      category.category3rd?.map((list3rd: any) => {
        list3rd.checked = false;
      });
    }
    if (category.category2ndId && category.checked) {
      newCategory &&
        newCategory.map((list1st: any) => {
          list1st.category2nd.map((list2nd: any) => {
            if (list2nd.id === category.category2ndId) {
              list1st.checked = true;
              list2nd.checked = true;
            }
          });
        });
    } else if (category.category1stId && category.checked) {
      newCategory &&
        newCategory.map((list1st: any) => {
          if (list1st.id === category.category1stId) {
            list1st.checked = true;
          }
        });
    }
    newCategory && setNewCategory(newCategory);
  };

  return (
    <CheckboxBlock>
      <CheckboxLabel htmlFor="checkBox" onClick={onClick}>
        {category.checked ? (
          <BiCheckboxChecked color="#faad14" />
        ) : (
          <BiCheckbox />
        )}
        <CheckboxText>{category.description}</CheckboxText>
      </CheckboxLabel>
    </CheckboxBlock>
  );
};

export const StyledCategory = ({
  newCategory,
  setNewCategory,
}: categoryProps) => {
  return (
    <CheckboxCategoryBlock>
      <div style={{ display: "flex" }}>
        <Title>1차 품목분류</Title>
        <Title>2차 품목분류</Title>
        <Title>3차 품목분류</Title>
      </div>
      <ColFlex>
        {newCategory?.map((c1st, index) => (
          <LineFlex key={index}>
            <StyledCheckBox
              category={c1st}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
            />
            <ColFlex>
              {c1st.category2nd?.map((c2nd: any, index: number) => (
                <LineFlex key={index}>
                  <StyledCheckBox
                    category={c2nd}
                    newCategory={newCategory}
                    setNewCategory={setNewCategory}
                  />
                  <ColFlex>
                    {c2nd.category3rd?.map((c3rd: any, index: number) => (
                      <LineFlex key={index}>
                        <StyledCheckBox
                          category={c3rd}
                          newCategory={newCategory}
                          setNewCategory={setNewCategory}
                        />
                      </LineFlex>
                    ))}
                  </ColFlex>
                </LineFlex>
              ))}
            </ColFlex>
          </LineFlex>
        ))}
      </ColFlex>
    </CheckboxCategoryBlock>
  );
};

export const CheckBox = ({
  isChecked,
  onClick,
}: {
  isChecked: boolean;
  onClick: (data: any) => void;
}) => {
  return isChecked ? (
    <FaCheckSquare onClick={onClick} />
  ) : (
    <FaRegSquare onClick={onClick} />
  );
};
