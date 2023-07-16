import styled from "styled-components";
import PageHeader from "lib/pages/pageHeader";
import { BreadCrumb, Button, Responsive, StyledSelect } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import { useNavigate } from "react-router-dom";
import { response } from "types/globalTypes";
import { ColumnsType } from "lib/columns/columnsList";

type ProductProps = {
  productList: response;
  productListColumns: ColumnsType[];
};

const ProductListBlock = styled(Responsive)``;

const ProductList = ({ productList, productListColumns }: ProductProps) => {
  const navigate = useNavigate();

  return (
    <>
      <ProductListBlock>
        <PageHeader
          breadCrumb={
            <BreadCrumb
              indicator={[
                {
                  name: "품목 관리",
                  url: "/code/product",
                },
              ]}
            />
          }
          extra={
            <Button onClick={() => navigate("/code/product/register")}>
              품목 등록
            </Button>
          }
        />
      </ProductListBlock>
      <ProductListBlock>
        <Table
          columns={productListColumns}
          content={productList.data}
          url="/code/product/detail"
          moveKey={["base", "id"]}
          pagenation
          filter
          filterInput={
            <StyledSelect
              placeholder="사용 상태"
              optionList={[]}
              actions={function () {}}
            />
          }
        />
        {/* <MasterAuthority content={<ProductAddContainer />} /> */}
      </ProductListBlock>
    </>
  );
};

export default ProductList;
