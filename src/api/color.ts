import { accessClient, client } from "./createAPI";

export const colorFindAll = async (isDesc: boolean) => {
  return client.get(`/store/color_code/findAll/${isDesc}`).then((res) => {
    return res;
  });
};

export const colorFindByName = async (name: string) => {
  return client.get(`/store/color_code/findByName/${name}`).then((res) => {
    return res;
  });
};

export const colorRegister = async (data: object) => {
  return accessClient
    .post(`/master/color_code/register`, {
      ...data,
    })
    .then((res) => res);
};

export const colorUpdate = async (data: object) => {
  return accessClient
    .post(`/master/color_code/update`, {
      ...data,
    })
    .then((res) => res);
};

export const setOpenStatus = async (id: string, openStatus: string) => {
  return await accessClient
    .get(`/master/color_code/setOpenStatus`, {
      params: {
        id,
        openStatus,
      },
    })
    .then((res) => res);
};

export const countColor = async () => {
  return await client.get(`/store/color_code/getAllCount`).then((res) => res);
};

export const pageColor = async (data: object) => {
  return await client
    .get(`/store/color_code/getPageByAll`, {
      params: {
        ...data,
      },
    })
    .then((res) => res);
};
