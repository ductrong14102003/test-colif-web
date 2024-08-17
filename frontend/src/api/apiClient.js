import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
});

apiClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("auth-token");

    if (token) {
      config.headers["auth-token"] = token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default apiClient;
