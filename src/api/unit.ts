import { accessClient, client } from "./createAPI";

export const findAllByProductId = async (data: object) => {
  return client
    .get(`/store/product/unit/findAllByProductId`, {
      params: { ...data },
    })
    .then((res) => res.data);
};

export const findById = async (id: string) => {
  return client
    .get(`/store/product/unit/findById/${id}`)
    .then((res) => res.data);
};

export const register = async (data: object) => {
  return accessClient
    .post(`/master/product/unit/register`, { ...data })
    .then((res) => res.data);
};

export const update = async (data: object) => {
  return accessClient
    .post(`/master/product/unit/update`, { ...data })
    .then((res) => res.data);
};

export const setOpenStatus = async (data: object) => {
  return accessClient
    .get(`/master/product/unit/setOpenStatus`, {
      params: { ...data },
    })
    .then((res) => res.data);
};
