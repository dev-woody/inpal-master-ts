import { accessClient, client } from "./createAPI";

export const register = async (data: object) => {
  return accessClient
    .post(`/master/product/manufacturer/register`, { ...data })
    .then((res) => res);
};

export const basicInfo = async (data: object) => {
  return accessClient
    .post(`/master/product/manufacturer/update/basicInfo`, { ...data })
    .then((res) => res);
};

export const detailPage = async (data: object) => {
  return accessClient
    .post(`/master/product/manufacturer/update/detailPage`, { ...data })
    .then((res) => res);
};

export const findAll = async (isDesc: boolean) => {
  return client
    .get(`/store/product/manufacturer/findAll/${isDesc}`)
    .then((res) => res);
};

export const findAllByProductId = async (data: object) => {
  return client
    .get(`/store/product/manufacturer/findAllByProductId`, {
      params: { ...data },
    })
    .then((res) => res);
};

export const findById = async (id: string) => {
  return client
    .get(`/store/product/manufacturer/findById/${id}`)
    .then((res) => res);
};

export const setOpenStatus = async (data: object) => {
  return accessClient
    .get(`/master/product/manufacturer/setOpenStatus`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};
