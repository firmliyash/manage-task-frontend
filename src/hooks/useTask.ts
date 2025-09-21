import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "./redux";
import { login, logout } from "../store/authSlice";
import api from "../services/api";
import {
  CreateTaskSchema,
  LoginResponse,
  ProjectSchema,
  SignupCredentials,
} from "../types/auth";
import { notifications } from "@mantine/notifications";

// Login hook
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateTaskSchema): Promise<any> => {
      const response = await api.post("/tasks", payload);
      return response.data;
    },
    onSuccess: (data) => {
      notifications.show({
        title: "Success",
        message: "Task created successfully!",
        color: "green",
      });
      // Invalidate queries on login
      queryClient.invalidateQueries();
    },
  });
};

export const useGetMyTasks = ({
  page,
  per_page,
}: {
  page: number;
  per_page: number;
}) => {
  return useQuery({
    queryKey: ["my-tasks", page, per_page],
    queryFn: async () => {
      const response = await api.get("/tasks/my-tasks", {
        params: { page, per_page },
      });
      return response.data;
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { id: number }): Promise<any> => {
      const response = await api.delete(`/tasks/${payload.id}`);
      return response.data;
    },
    onSuccess: (data) => {
      notifications.show({
        title: "Success",
        message: "Task deleted successfully!",
        color: "green",
      });
      // Invalidate queries on login
      queryClient.invalidateQueries();
    },
  });
};

export const useTaskStatusUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { id: number, status: string }): Promise<any> => {
      const response = await api.patch(`/tasks/${payload.id}/status`, { status: payload.status });
      return response.data;
    },
    onSuccess: (data) => {
      notifications.show({
        title: "Success",
        message: "Task deleted successfully!",
        color: "green",
      });
      // Invalidate queries on login
      queryClient.invalidateQueries();
    },
  });
};
