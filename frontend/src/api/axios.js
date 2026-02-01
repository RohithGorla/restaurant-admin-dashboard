import axios from "axios";

const api = axios.create({
  baseURL: "https://restaurant-admin-dashboard-3g0l.onrender.com/api",
});

export default api;
