import { client, accessClient } from "./createAPI";

export const findById = async (id: string) => {
  return client.get(`/store/biz/vendor/findById/${id}`).then((res) => res);
};

export const findByName = async (name: string) => {
  return accessClient
    .get(`/master/biz/vendor/findByName/${name}`)
    .then((res) => res);
};

export const findAll = async (isDesc: boolean) => {
  return client.get(`/store/biz/vendor/findAll/${isDesc}`).then((res) => {
    return res;
  });
};

export const approve = async (id: string) => {
  return accessClient
    .get(`/master/biz/vendor/approve/${id}`)
    .then((res) => res);
};

export const setBizStatus = async (data: object) => {
  return accessClient
    .get(`/master/biz/vendor/setBizStatus`, {
      params: { ...data },
    })
    .then((res) => res);
};

//* order

export const orderFindAll = async (isDesc: boolean) => {
  return accessClient
    .get(`/master/construction/vendor/order/findAll/${isDesc}`)
    .then((res) => res);
};

export const orderFindById = async (id: string) => {
  return accessClient
    .get(`/master/construction/vendor/order/findById/${id}`)
    .then((res) => res);
};

//* payment

export const paymentRegister = async (
  paymentAdminId: string,
  vendorId: string,
  masterPayment: number,
  memo: string
) => {
  return accessClient
    .post(`/master/construction/vendor/payment/register`, {
      paymentAdminId,
      vendorId,
      masterPayment,
      memo,
    })
    .then((res) => res);
};

export const paymentFindById = async (vendorId: string, isDesc: boolean) => {
  return accessClient
    .get(`/master/construction/vendor/payment/findAllByVendorId`, {
      params: {
        vendorId,
        isDesc,
      },
    })
    .then((res) => res);
};

export const findAllByVendorId = async (vendorId: string, isDesc: boolean) => {
  return accessClient
    .get(`/master/construction/vendor/order/findAllByVendorId`, {
      params: {
        vendorId,
        isDesc,
      },
    })
    .then((res) => res);
};
