import axios from "axios";

// use environment variable instead of hardcoded URL
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// ================= AUTH =================
export const UserSignUp = async (data) =>
  API.post("/user/signup", data);

export const UserSignIn = async (data) =>
  API.post("/user/signin", data);

// ================= USER =================
export const getDashboardDetails = async (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

// ================= WORKOUT =================
export const getWorkouts = async (token, date) =>
  API.get(`/user/workout${date}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addWorkout = async (token, data) =>
  API.post(`/user/workout`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
