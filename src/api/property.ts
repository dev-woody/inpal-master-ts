import { accessClient, client } from "./createAPI";

export const register = async (data: object) => {
  return accessClient
    .post(`/master/product/property/register`, { ...data })
    .then((res) => res.data);
};

export const update = async (data: object) => {
  return accessClient
    .post(`/master/product/property/update`, { ...data })
    .then((res) => res.data);
};

export const propertySetOpenStatus = async (data: object) => {
  return accessClient
    .get(`/master/product/property/setOpenStatus`, {
      params: {
        ...data,
      },
    })
    .then((res) => res.data);
};

export const findAll = async (isDesc: boolean) => {
  return client
    .get(`/store/product/property/findAll/${isDesc}`)
    .then((res) => res.data);
};

export const findById = async (id: string) => {
  return client
    .get(`/store/product/property/findById/${id}`)
    .then((res) => res.data);
};

export const findAllByProductId = async (data: object) => {
  return client
    .get(`/store/product/property/findAllByProductId`, {
      params: {
        ...data,
      },
    })
    .then((res) => res.data);
};
