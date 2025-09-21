import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "./redux";
import { login, logout } from "../store/authSlice";
import api from "../services/api";
import { LoginResponse, ProjectSchema, SignupCredentials } from "../types/auth";
import { notifications } from "@mantine/notifications";

// Login hook
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ProjectSchema): Promise<LoginResponse> => {
      const response = await api.post("/project/create", payload);
      return response.data;
    },
    onSuccess: (data) => {
      notifications.show({
        title: "Success",
        message: "Project created successfully!",
        color: "green",
      });
      // Invalidate queries on login
      queryClient.invalidateQueries();
    },
  });
};

export const useGetProjects = ({
  page,
  per_page,
}: {
  page: number;
  per_page: number;
}) => {
  return useQuery({
    queryKey: ["user-projects", page, per_page],
    queryFn: async () => {
      const response = await api.get("/project", {
        params: { page, per_page },
      });
      return response.data;
    },
  });
};
export const useGetProjectDropdown = ({ enable }: { enable: boolean }) => {
  return useQuery({
    queryKey: ["user-projects-dropdown"],
    queryFn: async () => {
      const response = await api.get("/project/dropdown", {});
      return response.data;
    },
    enabled: enable,
  });
};

export const useGetDropdownProjectMembers = ({
  project_id,
}: {
  project_id: number;
}) => {
  return useQuery({
    queryKey: ["project-members", project_id],
    queryFn: async () => {
      const response = await api.get(
        `/project/${project_id}/members?dropdown=true`
      );
      return response.data;
    },
    enabled: project_id !== 0,
  });
};
export const useGetProjectMembers = ({
  project_id,
  page,
  per_page,
}: {
  project_id: number;
  page: number;
  per_page: number;
}) => {
  return useQuery({
    queryKey: ["project-members", project_id, page, per_page],
    queryFn: async () => {
      const response = await api.get(
        `/project/${project_id}/members?page=${page}&per_page=${per_page}`
      );
      return response.data;
    },
    enabled: project_id !== 0,
  });
};

export const useGetProjectTasks = ({
  project_id,
  page,
  per_page,
}: {
  project_id: number;
  page: number;
  per_page: number;
}) => {
  return useQuery({
    queryKey: ["project-tasks", project_id, page, per_page],
    queryFn: async () => {
      const response = await api.get(
        `/tasks/projects/${project_id}?page=${page}&per_page=${per_page}`
      );
      return response.data;
    },
    enabled: project_id !== 0,
  });
};

export const useUserInvite = () => {
  return useMutation({
    mutationFn: async ({
      project_id,
      user_id,
      role,
    }: {
      project_id: number;
      user_id: number;
      role: string;
    }): Promise<any> => {
      const response = await api.post(`/project/${project_id}/invite`, {
        user_id,
        role,
      });
      return response.data;
    },
    onSuccess: (data) => {
      notifications.show({
        title: "Success",
        message: "User invited successfully!",
        color: "green",
      });
    },
  });
};
