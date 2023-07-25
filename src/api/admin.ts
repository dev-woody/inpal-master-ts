import { accessClient, client } from "./createAPI";

export const signIn = async (data: object) => {
  return await client.post(`/master/admin/signIn`, { ...data }).then((res) => {
    if (res.data.success === true) {
      localStorage.setItem("access_token", res.data.data.tokenInfo.token);
      localStorage.setItem(
        "refresh_token",
        res.data.data.tokenInfo.refreshToken
      );
      localStorage.setItem("user", JSON.stringify(res.data.data.adminInfo));
    }
    return res;
  });
};

export const checkPassword = async (data: object) => {
  return await accessClient
    .post(`/master/admin/passwordCheck`, { ...data })
    .then((res) => res.data);
};

export const findAll = async (isDesc: boolean) => {
  return accessClient.get(`/master/admin/findAll/${isDesc}`).then((res) => {
    return res.data;
  });
};

export const findByUserId = async (userId: string) => {
  return accessClient
    .get(`/master/admin/findByUserId/${userId}`)
    .then((res) => res.data);
};

export const update = async (data: object) => {
  return accessClient.post(`/master/admin/update`, { ...data }).then((res) => {
    return res.data;
  });
};

export const signUp = async (data: object) => {
  return accessClient
    .post(`/master/admin/signUp`, {
      ...data,
    })
    .then((res) => res.data);
};

export const changePass = async (data: object) => {
  console.log(data);
  return accessClient
    .post(`/master/admin/passwordChange`, { ...data })
    .then((res) => {
      return res.data;
    });
};
