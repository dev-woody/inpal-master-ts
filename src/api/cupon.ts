import { accessClient } from "./createAPI";

export const uploadImage = async (formData: FormData) => {
  return accessClient
    .post(`/master/coupon/image/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
};

export const register = async (data: object) => {
  return accessClient
    .post(`/master/coupon/register`, { ...data })
    .then((res) => res.data);
};

export const update = async (data: object) => {
  return accessClient.post(`/master/coupon/update`, { ...data }).then((res) => {
    return res.data;
  });
};

export const setStatus = async (data: object) => {
  return accessClient
    .get(`/master/coupon/setStatus`, {
      params: {
        ...data,
      },
    })
    .then((res) => res.data);
};

export const findById = async (id: string) => {
  return accessClient.get(`/master/coupon/findById/${id}`).then((res) => {
    return res.data;
  });
};

export const findAll = async (isDesc: boolean) => {
  return accessClient.get(`/store/coupon/findAll/${isDesc}`).then((res) => {
    return res.data;
  });
};
