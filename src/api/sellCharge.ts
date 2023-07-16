import { accessClient } from "./createAPI";

export const findAllByVId = async (data: object) => {
  return accessClient
    .get(`/master/construction/vendor/payment/sellCharge/findAllByVendorId`, {
      params: {
        ...data,
      },
    })
    .then((res) => res.data);
};

export const findById = async (data: object) => {
  return accessClient
    .get(`/master/construction/vendor/payment/sellCharge/findById`, {
      params: {
        ...data,
      },
    })
    .then((res) => res.data);
};

export const register = async (data: object) => {
  return accessClient
    .post(`/master/construction/vendor/payment/sellCharge/register`, {
      ...data,
    })
    .then((res) => res.data);
};

export const update = async (data: object) => {
  return accessClient
    .post(`/master/construction/vendor/payment/sellCharge/update`, {
      ...data,
    })
    .then((res) => res.data);
};
