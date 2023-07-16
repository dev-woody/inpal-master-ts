import PageHeader from "lib/pages/pageHeader";
import { Responsive } from "lib/styles";
import { Table } from "lib/styles/tableStyle";
import styled from "styled-components";

const GoodSellBlock = styled(Responsive)``;

const ItemColumns = [
  {
    title: "코드",
    dataIndex: "code",
  },
  {
    title: "그룹명",
    dataIndex: "description",
  },
  {
    title: "입력일",
    dataIndex: "createdAt",
  },
  {
    title: "수정일",
    dataIndex: "updatedAt",
  },
  {
    title: "판매량",
    dataIndex: "sellCount",
  },
  {
    title: "판매상태",
    dataIndex: "sellStatus",
  },
];

export const testData = [
  {
    id: "06f9e5d4-4f92-4746-a654-b3d7698e06f6",
    code: "C_V0_G50",
    name: "C_V0_상품그룹_덤프49_d21d3dd2-aa14-4913-b0d8-10b9123a9a90",
    description: "상품그룹0",
    itemPerLine: 7,
    sellStatus: "STOP",
    vendorId: "62ca5df7-6aab-44d2-aad0-ce48dd85d4bf",
    product: {
      id: "d2ce44f3-ddf9-4043-ae15-6086d1d4db17",
      code: "C_P0",
      name: "토탈인테리어",
      nameEn: "total",
      openStatus: "CLOSE",
      masterId: "dolbol",
      updatedAt: "20221205152731",
      createdAt: "20221123182805",
    },
    productCategoryInfo: {
      id: "9fedacb4-3d05-4c5b-91c4-ddc315b70dba",
      productCategory1stInfos: [
        {
          id: "b0376199-4c69-4e7b-bbe3-83a0eb6e9d14",
          productCategoryInfoId: "9fedacb4-3d05-4c5b-91c4-ddc315b70dba",
          productCategory1st: {
            id: "2cf7d947-44a5-4ada-8008-fdc75ce01dbc",
            code: "C_P0_C11",
            description: "C_P0_C11",
            masterId: "dolbol",
            updatedAt: "20221123183837",
            createdAt: "20221123183837",
          },
          updatedAt: "20221205173345",
          createdAt: "20221205173345",
        },
        {
          id: "0bbf401e-a3ec-49aa-bed6-2e4911db7958",
          productCategoryInfoId: "9fedacb4-3d05-4c5b-91c4-ddc315b70dba",
          productCategory1st: {
            id: "98d24cdb-c7e1-4fe1-9d90-f5a3f6c83fb5",
            code: "C_P0_C10",
            description: "C_P0_C10",
            masterId: "dolbol",
            updatedAt: "20221123183832",
            createdAt: "20221123183832",
          },
          updatedAt: "20221205173345",
          createdAt: "20221205173345",
        },
      ],
      productCategory2ndInfos: [
        {
          id: "c42cb849-6fda-4d9f-b002-2c934abe7612",
          productCategoryInfoId: "9fedacb4-3d05-4c5b-91c4-ddc315b70dba",
          productCategory2nd: {
            id: "708b05d8-356c-43f8-83b0-aafcece01087",
            code: "C_P0_C10_C21",
            description: "C_P0_C10_C21",
            masterId: "dolbol",
            updatedAt: "20221123183914",
            createdAt: "20221123183914",
          },
          updatedAt: "20221205173345",
          createdAt: "20221205173345",
        },
        {
          id: "0b8d2a14-7a60-4e6f-bec2-814a2234bfd7",
          productCategoryInfoId: "9fedacb4-3d05-4c5b-91c4-ddc315b70dba",
          productCategory2nd: {
            id: "42e0c368-0566-4c93-8066-8b726e39c402",
            code: "C_P0_C10_C20",
            description: "C_P0_C10_C20",
            masterId: "dolbol",
            updatedAt: "20221123183909",
            createdAt: "20221123183909",
          },
          updatedAt: "20221205173345",
          createdAt: "20221205173345",
        },
      ],
      productCategory3rdInfos: [
        {
          id: "367ff56a-cba8-4e92-8478-eb7b5248a44e",
          productCategoryInfoId: "9fedacb4-3d05-4c5b-91c4-ddc315b70dba",
          productCategory3rd: {
            id: "6a5c5005-898f-4ddd-834e-bf9e3090ac52",
            code: "C_P0_C10_C20_C31",
            description: "P0_C10_C20_C31",
            masterId: "dolbol",
            updatedAt: "20221123183943",
            createdAt: "20221123183943",
          },
          updatedAt: "20221205173345",
          createdAt: "20221205173345",
        },
        {
          id: "e5b721d6-fd56-4f2e-8868-a074cf00e189",
          productCategoryInfoId: "9fedacb4-3d05-4c5b-91c4-ddc315b70dba",
          productCategory3rd: {
            id: "260fbb30-bd80-4eb8-ba4b-83257e99767e",
            code: "C_P0_C10_C20_C30",
            description: "P0_C10_C20_C30",
            masterId: "dolbol",
            updatedAt: "20221123183939",
            createdAt: "20221123183939",
          },
          updatedAt: "20221205173345",
          createdAt: "20221205173345",
        },
      ],
      updatedAt: "20221205173345",
      createdAt: "20221205173345",
    },
    manufacturer: {
      id: "95bf6618-829f-4d9a-8514-ff34113fd4c3",
      code: "C_P0_M0",
      productId: "d2ce44f3-ddf9-4043-ae15-6086d1d4db17",
      name: "토탈인테리어_제조사0",
      country: "한국",
      openStatus: "OPEN",
      masterId: "dolbol",
      updatedAt: "20221205163253",
      createdAt: "20221123184249",
      domestic: true,
    },
    goodSellCategory: "good_item_category",
    images: [
      {
        id: "a553cbf4-a8e3-4c53-823b-6a39db0ebae7",
        goodSellId: "06f9e5d4-4f92-4746-a654-b3d7698e06f6",
        path: "제품 이미지 경로 49",
        upDatedAt: "20221205173345",
        createdAt: "20221205173345",
        headImage: true,
      },
    ],
    detailPage: {
      id: "cadd6f50-0ae4-4cfb-b604-6d85f7f7aa97",
      path: "상세페이지 경로 49",
      upDatedAt: "20221205173345",
      createdAt: "20221205173345",
    },
    options: [
      {
        id: "2803f907-77b2-4427-90d6-cc524dc223ab",
        goodSellId: "06f9e5d4-4f92-4746-a654-b3d7698e06f6",
        name: "상품그룹0_옵션0",
        spec: "상품그룹0_옵션0_사양0",
        sellStatus: "STOP",
        price: 1000,
        stock: 9999,
        updatedAt: "20221206125134",
        createdAt: "20221205173345",
      },
      {
        id: "7aa57f4b-fd6d-4541-b86a-7255fea66dc6",
        goodSellId: "06f9e5d4-4f92-4746-a654-b3d7698e06f6",
        name: "상품그룹0_ 옵션1",
        spec: "상품그룹0_옵션0_사양1",
        sellStatus: "SELL",
        price: 2000,
        stock: 9999,
        updatedAt: "20221205173345",
        createdAt: "20221205173345",
      },
      {
        id: "b094579e-96c1-420d-83df-6edcf85cf5cb",
        goodSellId: "06f9e5d4-4f92-4746-a654-b3d7698e06f6",
        name: "상품그룹0_ 옵션2",
        spec: "상품그룹0_옵션0_사양2",
        sellStatus: "SELL",
        price: 3000,
        stock: 9999,
        updatedAt: "20221205173345",
        createdAt: "20221205173345",
      },
    ],
    sellCount: 0,
    adminId: "master : dolbol",
    updatedAt: "20221206125238",
    createdAt: "20221205173345",
  },
];

const GoodSell = () => {
  return (
    <GoodSellBlock>
      <PageHeader title="상품아이템 조회" />
      <Table columns={ItemColumns} content={testData} pagenation />
    </GoodSellBlock>
  );
};

export default GoodSell;
