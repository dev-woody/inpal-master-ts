import { accessClient, client } from "./createAPI";

export const register = async (data: object) => {
  return accessClient
    .post(`/master/product/register`, { ...data })
    .then((res) => res.data);
};

export const update = async (id: string, name: string, nameEn: string) => {
  return accessClient
    .post(`/master/product/update`, { id, name, nameEn })
    .then((res) => res.data);
};

export const findAll = async (isDesc: boolean) => {
  return client.get(`/store/product/findAll/${isDesc}`).then((res) => res.data);
};

export const findById = async (id: string) => {
  return client.get(`/store/product/findById/${id}`).then((res) => res.data);
};
