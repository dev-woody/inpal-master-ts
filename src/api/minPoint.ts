import { accessClient } from "./createAPI";

export const findAllByVId = async (data: object) => {
  return accessClient
    .get(`/master/construction/vendor/payment/minPoint/findAllByVendorId`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const findById = async (data: object) => {
  return accessClient
    .get(`/master/construction/vendor/payment/minPoint/findById`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

export const register = async (data: object) => {
  return accessClient
    .post(`/master/construction/vendor/payment/minPoint/register`, {
      ...data,
    })
    .then((res) => res);
};

export const update = async (data: object) => {
  return accessClient
    .post(`/master/construction/vendor/payment/minPoint/update`, {
      ...data,
    })
    .then((res) => res);
};
