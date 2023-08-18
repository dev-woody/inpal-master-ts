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
    .post(`/master/biz/vendor/approve/${id}`)
    .then((res) => res);
};

export const setBizStatus = async (data: object) => {
  return accessClient
    .post(
      `/master/biz/vendor/setBizStatus`,
      {},
      {
        params: { ...data },
      }
    )
    .then((res) => res);
};

export const countVendor = async () => {
  return await client.get(`/store/biz/vendor/getAllCount`).then((res) => res);
};

export const pageVendor = async (data: object) => {
  return await client
    .get(`/store/biz/vendor/getPageByAll`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

//* productNum
export const pnFindByVendorId = async (id: string) => {
  return accessClient
    .get(`/master/biz/vendor/productNum/findAllByVendorId/${id}`)
    .then((res) => res);
};

export const pnFindById = async (data: object) => {
  return accessClient
    .get(`/master/biz/vendor/productNum/findById`, { params: { ...data } })
    .then((res) => res);
};

export const pnRegister = async (data: object) => {
  return accessClient
    .post(`/master/biz/vendor/productNum/add`, {}, { params: { ...data } })
    .then((res) => res);
};

export const pnUpdate = async (data: object) => {
  return accessClient
    .post(
      `/master/biz/vendor/productNum/setCharge`,
      {},
      { params: { ...data } }
    )
    .then((res) => res);
};

export const setPnOpenStatus = async (data: object) => {
  return accessClient
    .post(
      `/master/biz/vendor/productNum/setOpenStatus`,
      {},
      { params: { ...data } }
    )
    .then((res) => res);
};

//* order

export const orderFindById = async (id: string) => {
  return accessClient
    .get(`/master/order/item/findById/${id}`)
    .then((res) => res);
};

export const orderItemFindByVendorId = async (data: object) => {
  return accessClient
    .get(`/master/order/item/findByVendorId`, { params: { ...data } })
    .then((res) => res);
};

export const orderLogFindByItemId = async (data: object) => {
  return accessClient
    .get(`/master/order/status/findByItemId`, {
      params: { ...data },
    })
    .then((res) => res);
};

export const orderFindAll = async (isDesc: boolean) => {
  return accessClient
    .get(`/master/construction/vendor/order/findAll/${isDesc}`)
    .then((res) => res);
};

export const setOrderStatus = async (data: object) => {
  return accessClient
    .post(`/master/order/status/setOrderStatus`, { ...data })
    .then((res) => res);
};

export const countOrder = async (id: string) => {
  return await accessClient
    .get(`/master/order/item/getCountByVendorId/${id}`)
    .then((res) => res);
};

export const pageOrder = async (data: object) => {
  return await accessClient
    .get(`/master/order/item/getPageByVendorId`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};

// export const orderFindById = async (id: string) => {
//   return accessClient
//     .get(`/master/construction/vendor/order/findById/${id}`)
//     .then((res) => res);
// };

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

export const findAllByVendorId = async (id: string) => {
  return (
    accessClient
      //! 조회하는 URL 없음
      .get(`/master/biz/vendor/productNum/findAllByVendorId/${id}`)
      .then((res) => res)
  );
};
