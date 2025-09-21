export interface UserInfo {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    userInfo: UserInfo;
  };
}


export interface LoginCredentials {
  email: string;
  password: string;
}
export interface ProjectSchema {
  name: string;
  description: string;
}
export interface CreateTaskSchema {
  project_id: number;
  title: string;
  description: string;
  assigned_to: number;
  deadline: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserInfo | null;
  accessToken: string | null;
  refreshToken: string | null;
}