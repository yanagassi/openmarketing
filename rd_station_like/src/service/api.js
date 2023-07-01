import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050", // Defina a URL base da sua API
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
