import { accessClient, client } from "./createAPI";

export const searchByKeyword = async (keyword: string, isDesc: boolean) => {
  const res = await client.get(
    `/construction/common/good/group/searchByKeyword`,
    {
      params: {
        keyword,
        isDesc,
      },
    }
  );
  return res;
};

export const findById = async (id: string) => {
  const res = await client.get(
    `/construction/common/good/group/findById/${id}`
  );
  return res;
};

export const setSellStatus = async (
  vendorId: string,
  goodsGroupId: string,
  status: string
) => {
  const res = await accessClient.get(
    `/master/construction/good/group/setSellStatus`,
    {
      params: {
        vendorId,
        goodsGroupId,
        status,
      },
    }
  );
  return res;
};

export const setOptionStatus = async (
  vendorId: string,
  goodsGroupId: string,
  optionId: string,
  status: string
) => {
  const res = await accessClient.get(
    `/master/construction/good/group/option/setSellStatus`,
    {
      params: {
        vendorId,
        goodsGroupId,
        optionId,
        status,
      },
    }
  );
  return res;
};

export const itemFindBygoodsGroupId = async (
  goodsGroupId: string,
  isDesc: string
) => {
  const res = await client.get(
    `/construction/common/good/group/item/findAllBygoodsGroupId`,
    {
      params: {
        goodsGroupId,
        isDesc,
      },
    }
  );
  return res;
};

export const itemFindById = async (id: string) => {
  const res = await client.get(
    `/construction/common/good/group/item/findById/${id}`
  );
  return res;
};

export const setItemStatus = async (
  vendorId: string,
  goodsGroupId: string,
  goodsItemId: string,
  status: string
) => {
  const res = await accessClient.get(
    `/master/construction/good/group/item/setSellStatus`,
    {
      params: {
        vendorId,
        goodsGroupId,
        goodsItemId,
        status,
      },
    }
  );
  return res;
};
