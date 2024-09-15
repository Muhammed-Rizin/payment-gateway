import axios from "axios";
import { API_URL } from "@/config/config";

export const axiosApi = axios.create({ baseURL: API_URL });

axiosApi.defaults.withCredentials = true;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
export async function get(url: string, config = {}) {
  return await axiosApi.get(url, { ...config }).then((response) => response.data);
}

export async function post(url: string, data = {}, config = {}) {
  return axiosApi.post(url, data, { ...config }).then((response) => response.data);
}

export async function put(url: string, data = {}, config = {}) {
  return axiosApi.put(url, { ...data }, { ...config }).then((response) => response.data);
}

export async function del(url: string, config = {}) {
  return await axiosApi.delete(url, { ...config }).then((response) => response.data);
}
