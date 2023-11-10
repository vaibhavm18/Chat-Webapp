import axios from 'axios';
import { loginType, registerType } from './types';
const BASE_URL = import.meta.env.VITE_BASE_URL as string;

const instance = axios.create({
  // instanceURL: "https://real-time-editing.onrender.com/api/v1",
  baseURL: BASE_URL + '/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
});

instance.interceptors.request.use((req) => {
  const token = '';
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = async (credential: loginType) =>
  await instance.post(`/auth/login`, credential);

export const register = async (credential: registerType) =>
  await instance.post(`/auth/register`, credential);

export const authenticate = async () =>
  await instance.get(`/auth/authenticate`);

export const logout = async () => await instance.post(`/auth/logout`);
