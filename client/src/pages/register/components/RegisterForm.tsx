import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RegisterFormProps {
  formData: {
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthday: string;
    role: string;
  };
  errors: {
    nickname?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    birthday?: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailCheck: () => void;
  isCheckingEmail: boolean;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  onRoleChange: (value: string) => void;
}

export default function RegisterForm({
  formData,
  errors,
  onChange,
  onEmailCheck,
  isCheckingEmail,
  showPassword,
  setShowPassword,
  onRoleChange,
}: RegisterFormProps) {
  return (
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nickname">이름</Label>
        <Input
          id="nickname"
          placeholder="일반 회원은 닉네임을 사용해도 좋습니다"
          value={formData.nickname}
          onChange={onChange}
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
            onChange={onChange}
          />
          <Button
            type="button"
            onClick={onEmailCheck}
            disabled={isCheckingEmail}
          >
            {isCheckingEmail ? "중복 없음" : "중복 확인"}
          </Button>
        </div>
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">비밀번호</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
        />
        {errors.birthday && (
          <p className="text-red-500 text-sm">{errors.birthday}</p>
        )}
      </div>

      <div className="space-y-2">
        <RadioGroup value={formData.role} onValueChange={onRoleChange}>
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
  );
}
