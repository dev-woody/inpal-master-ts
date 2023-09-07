import { accessClient, client } from "./createAPI";

export const register = async (data: object) => {
  return accessClient
    .post(`/master/product/register`, { ...data })
    .then((res) => res);
};

export const update = async (id: string, name: string, nameEn: string) => {
  return accessClient
    .post(`/master/product/update`, { id, name, nameEn })
    .then((res) => res);
};

export const findAll = async (isDesc: boolean) => {
  return client.get(`/store/product/findAll/${isDesc}`).then((res) => res);
};

export const findById = async (id: string) => {
  return client.get(`/store/product/findById/${id}`).then((res) => res);
};

export const setOpenStatus = async (data: object) => {
  return accessClient.post(`/master/product/setOpenStatus`, {},{params: {...data}}).then((res) => res);
};
