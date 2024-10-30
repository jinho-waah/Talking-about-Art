import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { emailCheck, registerUser } from "./api/api";
import { validate } from "@/utils/register/Validate";
import RegisterForm from "./components/RegisterForm";
import RegisterFooter from "./components/RegisterFooter";

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

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    role: "general", // 기본값 설정
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
  };

  const handleEmailCheck = async () => {
    if (!formData.email) {
      setErrors({ ...errors, email: "이메일을 입력해주세요." });
      return;
    }
    try {
      const { isAvailable } = await emailCheck({ email: formData.email });

      if (isAvailable) {
        setIsCheckingEmail(true);
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }
      if (!isAvailable) {
        setErrors({ ...errors, email: "이미 사용 중인 이메일입니다." });
      } else {
        setErrors({ ...errors, email: "" });
      }
    } catch (error) {
      console.error("이메일 중복 검사 오류:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isCheckingEmail) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "이메일 중복 확인이 필요합니다.",
      }));
      return;
    }
    if (isCheckingEmail && errors.email === "이미 사용 중인 이메일입니다.") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "다른 이메일이 필요합니다.",
      }));
      return;
    }

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await registerUser(formData);
      if (response.status !== 200 && response.status !== 201) {
        throw new Error("회원가입에 실패했습니다.");
      }
      navigate(pageRoutes.login);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">계정 생성</CardTitle>
          <CardDescription>
            계정을 만들기 위해 정보를 입력하세요
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <RegisterForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onEmailCheck={handleEmailCheck}
            isCheckingEmail={isCheckingEmail}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            onRoleChange={handleRoleChange}
          />
          <RegisterFooter onNavigate={() => navigate(pageRoutes.login)} />
        </form>
      </Card>
    </div>
  );
}
