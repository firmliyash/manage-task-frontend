import axios from "axios";
import { store } from "../store";
import { logout, updateTokens } from "../store/authSlice";
import { notifications } from "@mantine/notifications";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errorMessages = error.response?.data?.message || [
      error.response?.data?.message ||
        "Something went wrong. Please try again.",
    ];
    if (Array.isArray(errorMessages)) {
      errorMessages.forEach((message: string) => {
        notifications.show({
          title: "Error",
          message,
          color: "red",
        });
      });
    } else if (typeof errorMessages === "object" && errorMessages !== null) {
      // Case 2: object of errors (key → message)
      Object.values(errorMessages).forEach((message: any) => {
        notifications.show({
          title: "Error",
          message: String(message),
          color: "red",
        });
      });
    } else {
      notifications.show({
        title: "Error",
        message: errorMessages,
        color: "red",
      });
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const state = store.getState();
      const refreshToken = state.auth.refreshToken;

      if (refreshToken) {
        try {
          // Attempt to refresh token
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } =
            response.data.data;

          // Update tokens in store
          store.dispatch(
            updateTokens({
              accessToken,
              refreshToken: newRefreshToken || refreshToken,
            })
          );

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, logout user
          store.dispatch(logout());
          window.location.href = "/login";
        }
      } else {
        store.dispatch(logout());
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
