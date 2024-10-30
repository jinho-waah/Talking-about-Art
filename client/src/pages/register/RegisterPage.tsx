import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "@/apiRoutes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { EMAIL_PATTERN } from "@/constants";
import { emailCheck, registerUser } from "./api/api";
import RegisterFooter from "./components/RegisterFooter";
import RegisterRadio from "./components/RegisterRadio";

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

  // 유효성 검사 함수
  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.nickname) newErrors.nickname = "이름을 입력해주세요.";
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!EMAIL_PATTERN.test(formData.email)) {
      newErrors.email = "이메일 양식이 올바르지 않습니다.";
    }
    if (!formData.password) newErrors.password = "비밀번호를 입력해주세요.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    if (!formData.birthday) newErrors.birthday = "생일을 선택해주세요.";
    return newErrors;
  };

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

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await registerUser(formData);
      console.log(response);
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
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nickname">이름</Label>
              <Input
                id="nickname"
                placeholder="일반 회원은 닉네임을 사용해도 좋습니다"
                value={formData.nickname}
                onChange={handleChange}
              />
              {errors.nickname && (
                <p className="text-red-500 text-sm">{errors.nickname}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="email"
                  placeholder="mail@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Button
                  type="button"
                  onClick={handleEmailCheck}
                  disabled={isCheckingEmail}
                >
                  {isCheckingEmail ? "중복 없음" : "중복 확인"}
                </Button>
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthday">생일</Label>
              <Input
                id="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange}
              />
              {errors.birthday && (
                <p className="text-red-500 text-sm">{errors.birthday}</p>
              )}
            </div>
            <RegisterRadio
              formData={formData}
              onValueChange={handleRoleChange}
            />
          </CardContent>
          <RegisterFooter onNavigate={() => navigate(pageRoutes.login)} />
        </form>
      </Card>
    </div>
  );
}
