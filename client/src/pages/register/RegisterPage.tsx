import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { pageRoutes } from "@/apiRoutes";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { EMAIL_PATTERN, SERVER_DOMAIN } from "@/constants";

interface RegisterFormData {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday: string;
  role: string; // 추가된 필드
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
      const response = await fetch(`${SERVER_DOMAIN}api/check-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (data.isAvailable) {
        setIsCheckingEmail(true);
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }
      if (!data.isAvailable) {
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
      const response = await fetch(`${SERVER_DOMAIN}api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
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

            <div className="space-y-2">
              <RadioGroup
                value={formData.role}
                onValueChange={handleRoleChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="general" id="option-one" />
                  <Label htmlFor="option-one">일반 회원</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gallery" id="option-two" />
                  <Label htmlFor="option-two">
                    전시장 (추가 인증 후 전시장 전용 계정으로 전환 됩니다.)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="curator" id="option-three" />
                  <Label htmlFor="option-three">
                    큐레이터 (추가 인증 후 큐레이터 전용 계정으로 전환 됩니다.)
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              계정 생성
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              이미 계정이 있으신가요?{" "}
              <span
                onClick={() => navigate(pageRoutes.login)}
                className="text-primary hover:underline cursor-pointer"
              >
                로그인
              </span>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
