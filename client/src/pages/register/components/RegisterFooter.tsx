import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface RegisterFooterProps {
  onNavigate: () => void;
}

export default function RegisterFooter({ onNavigate }: RegisterFooterProps) {
  return (
    <CardFooter className="flex flex-col space-y-4">
      <Button type="submit" className="w-full">
        계정 생성
      </Button>
      <div className="text-sm text-center text-muted-foreground">
        이미 계정이 있으신가요?{" "}
        <span
          onClick={onNavigate}
          className="text-primary hover:underline cursor-pointer"
        >
          로그인
        </span>
      </div>
    </CardFooter>
  );
}
