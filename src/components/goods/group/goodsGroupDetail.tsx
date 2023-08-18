import { Fragment } from "react";
import { Description, DescriptionContent } from "lib/styles/descriptionStyles";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Button, Responsive, StyledSelect } from "lib/styles";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { changeDays, changeOpenStatus } from "lib/functions/changeInput";
import { response } from "types/globalTypes";
import GoodsItemContainer from "containers/goods/item/goodsItemContainer";
import { NavigateFunction, useParams } from "react-router-dom";

const GoodsGroupDetailBlock = styled(Responsive)``;

type groupDetailProps = {
  groupDetail: response;
  navigate: NavigateFunction;
};

const GoodsGroupDetail = ({ groupDetail, navigate }: groupDetailProps) => {
  const data = groupDetail?.data;
  const { goodsGroupPageNum } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const CategoryList = () => {
    const List1st =
      data?.info.basic.info.handleCategorys.info.handleCategory1sts.map(
        (item1st: any) => item1st.info.category.info.description
      );
    return List1st;
  };
  return (
    <Fragment>
      <GoodsGroupDetailBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "상품그룹 관리 /",
                  url: `/goods/group/${goodsGroupPageNum}`,
                },
                {
                  name: "상세정보",
                  url: "",
                },
              ]}
            />
          }
        />
      </GoodsGroupDetailBlock>
      <GoodsGroupDetailBlock>
        {/* <form onSubmit={handleSubmit((data) => onSetSellStatus({ data }))}> */}
        <Description>
          <DescriptionContent label="코드" content={data?.info.code} />
          <DescriptionContent
            label="그룹명"
            content={data?.info.basic.info.name}
          />
          <DescriptionContent
            label="그룹설명"
            content={data?.info.basic.info.description}
          />
          <DescriptionContent
            label="품목"
            content={data?.info.basic.info.product.info.nameKr}
          />
          <DescriptionContent
            label="제조사"
            content={data?.info.basic.info.manufacturer.info.basic.info.nameKr}
          />
          <DescriptionContent
            label="속성"
            content={data?.info.basic.info.property.info.property}
          />
          <DescriptionContent
            span="12"
            label="1차 카테고리"
            content={data?.info.basic.info.handleCategorys.info.handleCategory1sts.map(
              (item: any) => item.info.category.info.description
            )}
          />
          <DescriptionContent
            span="12"
            label="2차 카테고리"
            content={data?.info.basic.info.handleCategorys.info.handleCategory2nds.map(
              (item: any) => item.info.category.info.description
            )}
          />
          <DescriptionContent
            span="12"
            label="3차 카테고리"
            content={data?.info.basic.info.handleCategorys.info.handleCategory3rds.map(
              (item: any) => item.info.category.info.description
            )}
          />
          <DescriptionContent
            label="상품이미지"
            content={
              <Button
                type="button"
                onClick={() =>
                  navigate(
                    `/image/${data?.info.goodImages.info.imageNums[0].info.image.id}`
                  )
                }
              >
                상세보기
              </Button>
            }
          />
          <DescriptionContent
            label="상세페이지"
            content={
              <Button
                type="button"
                onClick={() =>
                  navigate(
                    `/image/${data?.info.detailPage.info.imageNums[0].info.image.id}`
                  )
                }
              >
                상세보기
              </Button>
            }
          />
          <DescriptionContent
            label="생성일"
            content={changeDays(data?.base.createdAt)}
          />
          <DescriptionContent
            label="수정일"
            content={changeDays(data?.base.updatedAt)}
          />
          <DescriptionContent
            label="판매상태"
            content={changeOpenStatus(data?.info.openStatus)}
          />
        </Description>
      </GoodsGroupDetailBlock>
      <GoodsItemContainer />
    </Fragment>
  );
};

export default GoodsGroupDetail;
