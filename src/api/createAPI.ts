import axios from "axios";

export const client = axios.create({
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    validateStatus: false,
  },
});

export const accessClient = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    validateStatus: false,
  },
});

accessClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    // 인증 에러 발생시
    if (error.response && error.response.status === 401) {
      try {
        const originalRequest = error.config;
        const data = await axios({
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
          },
          url: "/master/admin/refreshToken",
          params: {
            grant_type: `refresh_token`,
          },
        });
        if (data) {
          const access_token = data.data.data;
          localStorage.removeItem("access_token");
          localStorage.setItem("access_token", access_token);
          originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
          return accessClient.request(originalRequest);
        }
      } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        console.log(error);
        window.location.reload();
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
