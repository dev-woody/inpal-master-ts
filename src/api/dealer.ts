import { client, accessClient } from "./createAPI";

export const register = (id: string) => {
  return accessClient
    .get(`/master/construction/dealer/register/${id}`)
    .then((res) => res);
};

export const setDealerStatus = (dealerId: string, dealerStatus: string) => {
  return accessClient
    .get(`/master/construction/dealer/setDealerStatus`, {
      params: {
        dealerId,
        dealerStatus,
      },
    })
    .then((res) => res);
};

export const findAll = (reverse: boolean) => {
  return client
    .get(`/construction/common/dealer/findAll/false/${reverse}`)
    .then((res) => res);
};

export const findById = (id: string) => {
  return client
    .get(`/construction/common/dealer/findById/${id}`)
    .then((res) => res);
};

export const orderFindAll = (dealerId: string, isDesc: boolean) => {
  return accessClient
    .get(`/master/construction/dealer/order/findAll`, {
      params: {
        dealerId,
        isDesc,
      },
    })
    .then((res) => res);
};

export const orderFindByDealerId = (dealerId: string, isDesc: boolean) => {
  return accessClient
    .get(`/master/construction/dealer/order/findAll`, {
      params: {
        dealerId,
        isDesc,
      },
    })
    .then((res) => res);
};

export const orderFindById = (id: string) => {
  return accessClient.get(``);
};
