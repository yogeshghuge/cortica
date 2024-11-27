// services/api.js
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const markAttendance = (data, config) => API.post("/attendance/mark", data, config);
