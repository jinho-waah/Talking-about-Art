import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { validate } from "@/utils/register/Validate";
import RegisterForm from "./components/RegisterForm";
import RegisterFooter from "./components/RegisterFooter";
import { RegisterFormData, FormErrors } from "./types";
import { useRegister } from "./hooks/useRegister";
import { useEmailCheck } from "./hooks/useEmailCheck";

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    role: "general",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    handleEmailCheck,
    errors: emailErrors,
    isCheckingEmail,
  } = useEmailCheck(formData.email);
  const { mutate: registerUser } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value });
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

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    registerUser(formData);
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
            errors={{ ...errors, email: emailErrors }}
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
