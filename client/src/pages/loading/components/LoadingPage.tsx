import { Loader2 } from "lucide-react";

export const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-[300px]">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );
};
