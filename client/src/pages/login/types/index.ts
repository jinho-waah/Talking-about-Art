import { Role } from "@/constants";

export interface FormData {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  userId: number;
  galleryId: number;
  role: Role;
  userName: string;
  imgUrl: string;
}

export interface LoginFormProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    email?: string;
    password?: string;
  };
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}
