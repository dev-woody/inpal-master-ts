import { client, accessClient } from "./createAPI";

export const approve = async (id: string) => {
  return await accessClient
    .post(`/master/biz/dealer/approve/${id}`)
    .then((res) => res);
};

export const setBizStatus = async (data: object) => {
  return await accessClient
    .post(
      `/master/biz/dealer/setBizStatus`,
      {},
      {
        params: { ...data },
      }
    )
    .then((res) => res);
};

export const findAll = async (isDesc: boolean) => {
  return await client
    .get(`/store/biz/dealer/findAll/${isDesc}`)
    .then((res) => res);
};

export const findById = async (id: string) => {
  return await client
    .get(`/store/biz/dealer/findById/${id}`)
    .then((res) => res);
};

export const orderFindAll = async (dealerId: string, isDesc: boolean) => {
  return await accessClient
    .get(`/master/construction/dealer/order/findAll`, {
      params: {
        dealerId,
        isDesc,
      },
    })
    .then((res) => res);
};

export const orderFindByDealerId = async (
  dealerId: string,
  isDesc: boolean
) => {
  return await accessClient
    .get(`/master/construction/dealer/order/findAll`, {
      params: {
        dealerId,
        isDesc,
      },
    })
    .then((res) => res);
};

export const orderFindById = async (id: string) => {
  return await accessClient.get(``);
};
