import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RegisterRadioProps {
  formData: { role: string };
  onValueChange: (value: string) => void;
}

export default function RegisterRadio({
  formData,
  onValueChange,
}: RegisterRadioProps) {
  return (
    <div className="space-y-2">
      <RadioGroup value={formData.role} onValueChange={onValueChange}>
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
  );
}
