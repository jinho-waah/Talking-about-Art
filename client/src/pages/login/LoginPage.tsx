import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pageRoutes } from "@/apiRoutes";
import { EMAIL_PATTERN } from "@/constants";
import { LoginForm } from "./components/LoginForm";
import { FormData, FormErrors } from "./types";
import { useLogin } from "./hooks/useLogin";

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!EMAIL_PATTERN.test(formData.email)) {
      newErrors.email = "이메일 양식이 올바르지 않습니다.";
    }
    if (!formData.password) newErrors.password = "비밀번호를 입력해주세요.";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    loginMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">로그인</CardTitle>
          <CardDescription>
            이메일과 비밀번호를 입력하여 로그인하세요.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <LoginForm
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              로그인
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              계정이 없으신가요?{" "}
              <span
                onClick={() => navigate(pageRoutes.register)}
                className="text-primary hover:underline cursor-pointer"
              >
                회원가입
              </span>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
