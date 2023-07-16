import { accessClient, client } from "./createAPI";

export const searchByKeyword = (keyword: string, isDesc: boolean) => {
  return client
    .get(`/construction/common/good/group/searchByKeyword`, {
      params: {
        keyword,
        isDesc,
      },
    })
    .then((res) => res.data);
};

export const findById = (id: string) => {
  return client
    .get(`/construction/common/good/group/findById/${id}`)
    .then((res) => res.data);
};

export const setSellStatus = (
  vendorId: string,
  goodsGroupId: string,
  status: string
) => {
  return accessClient
    .get(`/master/construction/good/group/setSellStatus`, {
      params: {
        vendorId,
        goodsGroupId,
        status,
      },
    })
    .then((res) => res.data);
};

export const setOptionStatus = (
  vendorId: string,
  goodsGroupId: string,
  optionId: string,
  status: string
) => {
  return accessClient
    .get(`/master/construction/good/group/option/setSellStatus`, {
      params: {
        vendorId,
        goodsGroupId,
        optionId,
        status,
      },
    })
    .then((res) => res.data);
};

export const itemFindBygoodsGroupId = (
  goodsGroupId: string,
  isDesc: string
) => {
  return client
    .get(`/construction/common/good/group/item/findAllBygoodsGroupId`, {
      params: {
        goodsGroupId,
        isDesc,
      },
    })
    .then((res) => res.data);
};

export const itemFindById = (id: string) => {
  return client
    .get(`/construction/common/good/group/item/findById/${id}`)
    .then((res) => res.data);
};

export const setItemStatus = (
  vendorId: string,
  goodsGroupId: string,
  goodsItemId: string,
  status: string
) => {
  return accessClient
    .get(`/master/construction/good/group/item/setSellStatus`, {
      params: {
        vendorId,
        goodsGroupId,
        goodsItemId,
        status,
      },
    })
    .then((res) => res.data);
};
