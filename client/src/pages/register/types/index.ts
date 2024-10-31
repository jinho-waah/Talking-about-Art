// types/index.ts

export interface RegisterFormData {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: string;
  role: string;
}

export interface FormErrors {
  nickname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  birthday?: string;
  role?: string;
}

export interface EmailCheckResponse {
  isAvailable: boolean;
}

export interface RegisterResponse {
  status: number;
  message: string;
}
