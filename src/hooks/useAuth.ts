import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from './redux';
import { login, logout } from '../store/authSlice';
import api from '../services/api';
import { LoginCredentials, LoginResponse, SignupCredentials } from '../types/auth';
import { notifications } from '@mantine/notifications';

// Login hook
export const useLogin = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status == 200) {
        dispatch(login({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          userInfo: data.data.userInfo,
        }));
        notifications.show({
          title: 'Success',
          message: 'Logged in successfully!',
          color: 'green',
        });
        // Invalidate queries on login
        queryClient.invalidateQueries();
      }
    },
    
  });
};

// Signup hook
export const useSignup = () => {
  return useMutation({
    mutationFn: async (credentials: SignupCredentials): Promise<LoginResponse> => {
      const response = await api.post('/auth/signup', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data,'data');
      
      if (data.status === 200) {
        notifications.show({
          title: 'Success',
          message: 'Account created successfully! Please login.',
          color: 'green',
        });
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
    },
  });
};

// Logout hook
export const useLogout = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Optionally call logout endpoint
      try {
       console.log('Calling logout API...');
      } catch (error) {
        // Continue with logout even if API call fails
        console.warn('Logout API call failed:', error);
      }
    },
    onSuccess: () => {
      dispatch(logout());
      queryClient.clear();
      notifications.show({
        title: 'Success',
        message: 'Logged out successfully!',
        color: 'blue',
      });
    },
  });
};

// Get current user hook (for protected routes)
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await api.get('/auth/me');
      return response.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
export const useGetUsers = ({enable}:{enable: boolean}) => {
  return useQuery({
    queryKey: ['Users'],
    queryFn: async () => {
      const response = await api.get('/user/dropdown');
      return response.data;
    },
    retry: false,
    enabled: enable
  });
};