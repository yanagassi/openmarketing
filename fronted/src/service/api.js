import axios from "axios";
import configs from "../configs";
import jwtDecode from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:5050", // Defina a URL base da sua API
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "*",
  },
});

api.interceptors.request.use(async (config) => {
  const toe = localStorage.getItem(configs.TOKEN_JWT_PREFIX);
  if (toe) {
    config.headers.Authorization = `Bearer ${toe}`;
    try {
      const tw = jwtDecode(toe);
      config.headers.Organizationid = tw.organization.id;
    } catch {}
  }
  return config;
});

export default api;
