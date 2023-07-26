import { accessClient, client } from "./createAPI";

export const findAll = async () => {
  return client.get(`/construction/product/category/findAll`).then((res) => {
    return res;
  });
};

export const findAllByProductId = async (data: object) => {
  return client
    .get(`/store/product/category/findAllByProductId`, {
      params: { ...data },
    })
    .then((res) => res);
};

//* ---------------------------- new category api ------------------------------------

export const register = async (data: object) => {
  return accessClient
    .post(`/master/product/category/register`, { ...data })
    .then((res) => res);
};

export const setOpenStatus = async (id: string, openStatus: string) => {
  return accessClient
    .get(`/master/product/category/setOpenStatus`, {
      params: {
        id,
        openStatus,
      },
    })
    .then((res) => res);
};

export const update = async (data: object) => {
  return accessClient
    .post(`/master/product/category/update`, { ...data })
    .then((res) => res);
};

export const findAllByOwnerId = async (data: object) => {
  return client
    .get(`/store/product/category/findAllByOwnerId`, {
      params: { ...data },
    })
    .then((res) => res);
};

export const findById = async (id: string) => {
  return client
    .get(`/store/product/category/findById/${id}`)
    .then((res) => res);
};

export const findByCode = async (code: string) => {
  return client
    .get(`/store/construction/product/category/findByCode/${code}`)
    .then((res) => res);
};
