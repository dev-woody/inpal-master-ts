import { accessClient, client } from "./createAPI";

export const colorFindAll = async (isDesc: boolean) => {
  return client.get(`/store/color_code/findAll/${isDesc}`).then((res) => {
    return res.data;
  });
};

export const colorFindByName = async (name: string) => {
  return client.get(`/store/color_code/findByName/${name}`).then((res) => {
    return res.data;
  });
};

export const colorRegister = async (
  data: object
  // XRgb: string,
  // name: string,
  // kind: string
) => {
  return accessClient
    .post(`/master/color_code/register`, {
      ...data,
      // XRgb,
      // name,
      // kind,
    })
    .then((res) => res.data);
};

export const colorUpdate = async (
  data: object
  // id: string,
  // updateInfo: {
  //   XRgb: string;
  //   name: string;
  // }
) => {
  return accessClient
    .post(`/master/color_code/update`, {
      ...data,
      // id,
      // updateInfo,
    })
    .then((res) => res.data);
};

export const setOpenStatus = async (id: string, openStatus: string) => {
  return await accessClient
    .get(`/master/color_code/setOpenStatus`, {
      params: {
        id,
        openStatus,
      },
    })
    .then((res) => res.data);
};
