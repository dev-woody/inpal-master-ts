import { accessClient, client } from "./createAPI";

export const goodsGroupFindAll = async (isDesc: boolean) => {
  return client
    .get(`/store/construction/good/group/findAll/${isDesc}`)
    .then((res) => res);
};

export const countGoodsGroup = async () => {
  return await client
    .get(`/store/construction/good/group/getAllCount`)
    .then((res) => res);
};

export const pageGoodsGroup = async (data: object) => {
  return await client
    .get(`/store/construction/good/group/getPageByAll`, {
      params: {
        ...data,
      },
    })
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

//* item

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

export const countGoodsItem = async (data: object) => {
  return await client
    .get(`/store/construction/good/item/getCountByGoodGroupId`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const pageGoodsItem = async (data: object) => {
  return await client
    .get(`/store/construction/good/item/getPageByGoodGroupId`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

//* 품목 조회

export const countGroupProduct = async (data: object) => {
  return await client
    .get(`/store/construction/good/group/getCountByProductId`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const pageGroupProduct = async (data: object) => {
  return await client
    .get(`/store/construction/good/group/getPageByProductId`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};
