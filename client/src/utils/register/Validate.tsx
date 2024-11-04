import { EMAIL_PATTERN } from "@/constants";

interface RegisterFormData {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: string;
  role: string;
}

interface FormErrors {
  nickname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  birthday?: string;
  role?: string;
}

export const validate = (formData: RegisterFormData): FormErrors => {
  const errors: FormErrors = {};
  if (!formData.nickname) {
    errors.nickname = "이름을 입력해주세요.";
  }
  if (!formData.email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!EMAIL_PATTERN.test(formData.email)) {
    errors.email = "이메일 양식이 올바르지 않습니다.";
  }
  if (!formData.password) {
    errors.password = "비밀번호를 입력해주세요.";
  }
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  }
  if (!formData.birthday) {
    errors.birthday = "생일을 선택해주세요.";
  }
  return errors;
};
