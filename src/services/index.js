import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const service = axios.create({
  baseURL,
});

service.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response.status === 403) {
      // localStorage.removeItem("access_token")
      // window.location.href = "/auth"
    }
    return Promise.reject(error);
  }
);

// service.interceptors.request.use((config) => {
//   const token = localStorage.getItem("mmbs_access_token");
//   // eslint-disable-next-line no-param-reassign
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export { service };
