import PageHeader from "lib/pages/pageHeader";
import {
  BreadCrumb,
  Description,
  DescriptionContent,
  Responsive,
} from "lib/styles";
import { Button } from "lib/styles";
import styled from "styled-components";
import { response } from "types/globalTypes";
import { changeDays, changeOpenStatus } from "lib/functions/changeInput";
import { NavigateFunction } from "react-router-dom";

const ProductEditBlock = styled(Responsive)``;

type productProps = {
  editResult: boolean;
  productDetail: response;
  modalVisible: boolean;
  setModalVisible: (status: boolean) => void;
  navigate: NavigateFunction;
};

const ProductEdit = ({ productDetail, navigate }: productProps) => {
  const data = productDetail.data;

  return (
    <>
      <ProductEditBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "품목 관리 /",
                  url: "/code/product",
                },
                {
                  name: "상세조회",
                  url: "",
                },
              ]}
            />
          }
        />
      </ProductEditBlock>
      <ProductEditBlock>
        <Description>
          <DescriptionContent label="코드" content={data?.info.code} />
          <DescriptionContent label="품목명" content={data?.info.nameKr} />
          <DescriptionContent label="영문명" content={data?.info.nameEn} />
          <DescriptionContent
            label="작성일"
            content={changeDays(data?.base.createdAt)}
          />
        </Description>
        <Button
          withInput
          needMarginTop
          onClick={() => navigate("/code/product")}
        >
          돌아가기
        </Button>
      </ProductEditBlock>
    </>
  );
};

export default ProductEdit;
