import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { emailCheck } from "../api/api";
import { EmailCheckResponse } from "../types";
import { QUERY_KEY } from "@/constants";

export const useEmailCheck = (email: string) => {
  const [errors, setErrors] = useState<string | undefined>(undefined);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const { refetch: checkEmail } = useQuery<EmailCheckResponse, Error>({
    queryKey: [QUERY_KEY.EMAIL_CHECK, email],
    queryFn: () => emailCheck({ email }),
    enabled: false,
  });

  const handleEmailCheck = async () => {
    if (!email) {
      setErrors("이메일을 입력해주세요.");
      return;
    }
    try {
      const { data } = await checkEmail();
      if (data) {
        setIsCheckingEmail(data.isAvailable);
        setErrors(
          data.isAvailable ? undefined : "이미 사용 중인 이메일입니다."
        );
      }
    } catch {
      setErrors("이메일 중복 확인 중 오류가 발생했습니다.");
    }
  };

  return { handleEmailCheck, errors, isCheckingEmail };
};
