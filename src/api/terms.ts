import { accessClient } from "./createAPI";

export const register = async (data: any) => {
  const formData = new FormData();
  formData.append("kind", data.kind);
  formData.append("info", data.info);
  return accessClient
    .post(`/master/service_use_info/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res);
};

export const update = async (data: any) => {
  const formData = new FormData();
  formData.append("id", data.id);
  formData.append("info", data.info);
  return accessClient
    .post(`/master/service_use_info/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res);
};

export const setOpenStatus = async (data: object) => {
  return accessClient
    .post(`/master/service_use_info/setOpenStatus`, {}, { params: { ...data } })
    .then((res) => res);
};

export const findAll = async (isDesc: boolean) => {
  return accessClient
    .get(`/master/service_use_info/findAll/${isDesc}`)
    .then((res) => res);
};

export const findById = async (id: string) => {
  return accessClient
    .get(`/master/service_use_info/findById/${id}`)
    .then((res) => res);
};
