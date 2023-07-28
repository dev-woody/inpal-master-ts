import { accessClient, client } from "./createAPI";

export const goodsGroupFindAll = async (isDesc: boolean) => {
  return client
    .get(`/store/construction/good/group/findAll/${isDesc}`)
    .then((res) => res);
};

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
  const res = await client.get(`/store/construction/good/group/findById/${id}`);
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

export const itemFindBygoodsGroupId = async (data: object) => {
  const res = await client.get(
    `/store/construction/good/item/findByGoodGroupId`,
    {
      params: {
        ...data,
      },
    }
  );
  return res;
};

export const itemFindById = async (id: string) => {
  const res = await client.get(`/store/construction/good/item/findById/${id}`);
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
